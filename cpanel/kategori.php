<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'delete') {
        db_query('DELETE FROM forum_categories WHERE id = ?', [(int) $_POST['id']]);
        redirect('kategori.php?deleted=1');
    }
    if ($action === 'create') {
        $name = trim($_POST['name']);
        if ($name === '') {
            $error = 'Nama kategori wajib diisi';
        } else {
            $slug = slugify($name);
            $existing = db_fetch_one('SELECT id FROM forum_categories WHERE slug = ?', [$slug]);
            if ($existing) {
                $error = 'Kategori dengan nama serupa sudah ada';
            } else {
                $order = (int) db_fetch_one('SELECT COALESCE(MAX(sort_order), 0) + 1 AS o FROM forum_categories')['o'];
                db_query('INSERT INTO forum_categories (name, slug, sort_order) VALUES (?, ?, ?)', [$name, $slug, $order]);
                redirect('kategori.php?saved=1');
            }
        }
    }
}

$categories = db_fetch_all(
    'SELECT c.*, (SELECT COUNT(*) FROM forum_threads t WHERE t.category_id = c.id) AS thread_count
     FROM forum_categories c ORDER BY c.sort_order ASC'
);
?>
<h1 class="page-title">Kelola Kategori Forum</h1>

<?php if (isset($_GET['saved'])): ?><div class="alert success">Kategori ditambahkan.</div><?php endif; ?>
<?php if (isset($_GET['deleted'])): ?><div class="alert success">Kategori dihapus (thread di dalamnya juga terhapus).</div><?php endif; ?>
<?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

<div class="panel">
  <h2>Tambah Kategori</h2>
  <form method="post" class="form-inline">
    <input type="hidden" name="action" value="create">
    <input type="text" name="name" placeholder="Nama kategori baru" required>
    <button type="submit" class="btn">Simpan</button>
  </form>
</div>

<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Nama</th><th>Slug</th><th>Urutan</th><th>Thread</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($categories as $c): ?>
      <tr>
        <td><strong><?= e($c['name']) ?></strong></td>
        <td class="muted"><?= e($c['slug']) ?></td>
        <td><?= (int) $c['sort_order'] ?></td>
        <td><?= (int) $c['thread_count'] ?></td>
        <td class="right">
          <form method="post" class="inline" onsubmit="return confirm('Hapus kategori ini? Semua thread di dalamnya juga akan terhapus.')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $c['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$categories): ?>
      <tr><td colspan="5" class="center muted">Belum ada kategori.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
