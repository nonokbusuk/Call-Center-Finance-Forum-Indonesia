<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

// Ambil saran keyword dari Google Suggest (endpoint publik, tanpa API key)
function fetch_suggestions(string $seed): array
{
    $url = 'https://suggestqueries.google.com/complete/search?client=firefox&hl=id&gl=id&q=' . urlencode($seed);
    $ctx = stream_context_create(['http' => ['timeout' => 5, 'header' => "User-Agent: Mozilla/5.0\r\n"]]);
    $raw = @file_get_contents($url, false, $ctx);
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data[1] ?? null) ? $data[1] : [];
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'add') {
        $kw = trim($_POST['keyword']);
        $cat = trim($_POST['category']) ?: 'umum';
        if ($kw === '') {
            $error = 'Keyword wajib diisi';
        } else {
            $existing = db_fetch_one('SELECT id FROM keywords WHERE keyword = ?', [$kw]);
            if (!$existing) {
                db_query('INSERT INTO keywords (keyword, category) VALUES (?, ?)', [$kw, $cat]);
            }
            redirect('keyword.php?saved=1');
        }
    }
    if ($action === 'bulk') {
        $raw = (string) ($_POST['keywords_bulk'] ?? '');
        $cat = trim($_POST['category']) ?: 'umum';
        $added = 0;
        $skipped = 0;
        foreach (preg_split('/\r\n|\n|;/', $raw) as $line) {
            $kw = strtolower(trim($line));
            if ($kw === '') { continue; }
            $existing = db_fetch_one('SELECT id FROM keywords WHERE keyword = ?', [$kw]);
            if ($existing) { $skipped++; continue; }
            db_query('INSERT INTO keywords (keyword, category) VALUES (?, ?)', [$kw, $cat]);
            $added++;
        }
        redirect('keyword.php?bulk=' . $added . '&skip=' . $skipped);
    }
    if ($action === 'delete') {
        db_query('DELETE FROM keywords WHERE id = ?', [(int) $_POST['id']]);
        redirect('keyword.php?deleted=1');
    }
    if ($action === 'log_search') {
        // dicatat dari pencarian publik (site search)
        $kw = trim($_POST['keyword']);
        if ($kw !== '') {
            $existing = db_fetch_one('SELECT id FROM keywords WHERE keyword = ?', [$kw]);
            $kid = $existing ? (int) $existing['id'] : db_last_id();
            if (!$existing) {
                db_query('INSERT INTO keywords (keyword, category) VALUES (?, ?)', [$kw, 'pencarian publik']);
                $kid = db_last_id();
            }
            db_query('INSERT INTO keyword_searches (keyword_id, source) VALUES (?, ?)', [$kid, 'public']);
        }
        redirect('keyword.php');
    }
}

$suggestions = [];
$seed = '';
if (isset($_GET['check'])) {
    $seed = trim($_GET['check']);
    if ($seed !== '') {
        $suggestions = fetch_suggestions($seed);
        if (!$suggestions) {
            $error = 'Tidak bisa mengambil saran (konektivitas ke Google Suggest gagal). Coba lagi.';
        }
    }
}

$keywords = db_fetch_all(
    'SELECT k.*, COUNT(s.id) AS total_searches,
            SUM(CASE WHEN s.searched_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS last7,
            SUM(CASE WHEN s.searched_at >= DATE_SUB(NOW(), INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS last1
     FROM keywords k
     LEFT JOIN keyword_searches s ON s.keyword_id = k.id
     GROUP BY k.id
     ORDER BY total_searches DESC, k.keyword ASC'
);

// Data tren harian 14 hari (untuk grafik)
$trend = db_fetch_all(
    "SELECT DATE(s.searched_at) AS d, COUNT(*) AS c
     FROM keyword_searches s
     WHERE s.searched_at >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
     GROUP BY DATE(s.searched_at)
     ORDER BY d ASC"
);
$trend_labels = [];
$trend_values = [];
$map = [];
foreach ($trend as $t) $map[$t['d']] = (int) $t['c'];
for ($i = 13; $i >= 0; $i--) {
    $day = date('Y-m-d', strtotime("-$i day"));
    $trend_labels[] = date('d/m', strtotime($day));
    $trend_values[] = $map[$day] ?? 0;
}

$keywords_by_cat = [];
foreach ($keywords as $k) {
    $keywords_by_cat[$k['category']][$k['keyword']] = (int) $k['total_searches'];
}
?>
<h1 class="page-title">Keyword Trend Tracker</h1>

<?php if (isset($_GET['saved'])): ?><div class="alert success">Keyword ditambahkan.</div><?php endif; ?>
<?php if (isset($_GET['deleted'])): ?><div class="alert success">Keyword dihapus.</div><?php endif; ?>
<?php if (isset($_GET['bulk'])): ?><div class="alert success">Import massal selesai: <strong><?= (int) $_GET['bulk'] ?></strong> keyword ditambah, <?= (int) $_GET['skip'] ?> duplikat dilewati.</div><?php endif; ?>
<?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

<div class="panel">
  <h2>🔍 Cek Ide Keyword (Google Suggest Indonesia)</h2>
  <form method="get" class="form-inline">
    <input type="text" name="check" value="<?= e($seed) ?>" placeholder="Contoh: call center easycash, pinjaman cepat..." required>
    <button type="submit" class="btn">Cek Saran Keyword</button>
  </form>
  <?php if ($suggestions): ?>
    <div class="suggestion-list">
      <p class="muted">Saran dari Google (tema <?= e($seed) ?>) — klik + untuk memantau:</p>
      <ul>
        <?php foreach ($suggestions as $sg): ?>
        <li>
          <span><?= e($sg) ?></span>
          <form method="post" class="inline">
            <input type="hidden" name="action" value="add">
            <input type="hidden" name="keyword" value="<?= e($sg) ?>">
            <input type="hidden" name="category" value="<?= e($seed) ?>">
            <button type="submit" class="btn-sm">+ Pantau</button>
          </form>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>
  <?php endif; ?>
</div>

<div class="panel">
  <h2>📈 Tren Pencarian 14 Hari Terakhir</h2>
  <div class="chart-canvas">
    <?php
    $max = max(1, max($trend_values));
    $n = count($trend_values);
    for ($i = 0; $i < $n; $i++):
        $h = round(($trend_values[$i] / $max) * 100);
    ?>
    <div class="chart-col" title="<?= $trend_labels[$i] ?>: <?= $trend_values[$i] ?> pencarian">
      <div class="chart-bar" style="height: <?= max(4, $h) ?>%"></div>
      <span class="chart-label"><?= $trend_labels[$i] ?></span>
    </div>
    <?php endfor; ?>
  </div>
  <p class="muted">Total 14 hari: <?= array_sum($trend_values) ?> pencarian tercatat.</p>
</div>

<div class="panel">
  <h2>📋 Tempel Massal (Copy-Paste Banyak Keyword Sekaligus)</h2>
  <form method="post" class="form-grid">
    <input type="hidden" name="action" value="bulk">
    <div class="field span-2">
      <label>Daftar keyword — satu keyword per baris (atau pisah dengan titik-koma)</label>
      <textarea name="keywords_bulk" rows="8" class="mono" placeholder="call center easycash&#10;call center pinjol&#10;nomor telepon easycash hubungi di 08xxx&#10;pinjaman online cepat cair&#10;..."></textarea>
    </div>
    <div class="field">
      <label>Kategori untuk semua keyword di atas</label>
      <input type="text" name="category" placeholder="mis. pinjaman online" value="pinjaman online">
    </div>
    <div class="form-actions span-2">
      <button type="submit" class="btn">📥 Import Semua Keyword</button>
    </div>
  </form>
</div>

<div class="panel">
  <h2>➕ Tambah Keyword Manual</h2>
  <form method="post" class="form-inline">
    <input type="hidden" name="action" value="add">
    <input type="text" name="keyword" placeholder="Keyword yang ingin dipantau" required>
    <input type="text" name="category" placeholder="Kategori tema (mis. pinjaman online)" style="max-width:220px">
    <button type="submit" class="btn">Tambah</button>
  </form>
</div>

<div class="panel table-wrap">
  <h2>Daftar Keyword Dipantau</h2>
  <table>
    <thead>
      <tr><th>Keyword</th><th>Tema</th><th>7 Hari</th><th>24 Jam</th><th>Total</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($keywords as $k): ?>
      <tr>
        <td><strong><?= e($k['keyword']) ?></strong></td>
        <td><span class="badge badge-gray"><?= e($k['category']) ?></span></td>
        <td><?= (int) $k['last7'] ?></td>
        <td><?= (int) $k['last1'] ?></td>
        <td><strong><?= (int) $k['total_searches'] ?></strong></td>
        <td class="right">
          <a class="btn-sm" href="keyword.php?check=<?= urlencode($k['keyword']) ?>">Cek Saran</a>
          <form method="post" class="inline" onsubmit="return confirm('Hapus keyword ini?')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $k['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$keywords): ?>
      <tr><td colspan="6" class="center muted">Belum ada keyword dipantau.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
