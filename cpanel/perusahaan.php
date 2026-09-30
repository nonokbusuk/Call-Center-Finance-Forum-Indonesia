<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

$editing = null;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'delete') {
        db_query('DELETE FROM finance_companies WHERE id = ?', [(int) $_POST['id']]);
        redirect('perusahaan.php?deleted=1');
    }
    if ($action === 'save') {
        $name = trim($_POST['name']);
        $category = trim($_POST['category']);
        $phone = trim($_POST['phone']);
        if ($name === '' || $category === '') {
            $error = 'Nama dan kategori wajib diisi';
        } else {
            $slug = slugify($name);
            $existing = db_fetch_one('SELECT id FROM finance_companies WHERE slug = ? AND id != ?', [$slug, (int) ($_POST['id'] ?? 0)]);
            if ($existing) $slug .= '-' . time();
            $data = [
                'name' => $name, 'slug' => $slug, 'category' => $category,
                'phone' => $phone, 'whatsapp' => trim($_POST['whatsapp']),
                'email' => trim($_POST['email']), 'website' => trim($_POST['website']),
                'address' => trim($_POST['address']), 'description' => trim($_POST['description']),
                'rating' => min(5, max(0, (float) ($_POST['rating'] ?: 0))),
                'is_verified' => isset($_POST['is_verified']) ? 1 : 0,
                'is_featured' => isset($_POST['is_featured']) ? 1 : 0,
                'published' => isset($_POST['published']) ? 1 : 0,
            ];
            if (!empty($_POST['id'])) {
                $data['id'] = (int) $_POST['id'];
                db_query('UPDATE finance_companies SET name=:name, slug=:slug, category=:category, phone=:phone, whatsapp=:whatsapp, email=:email, website=:website, address=:address, description=:description, rating=:rating, is_verified=:is_verified, is_featured=:is_featured, published=:published WHERE id=:id', $data);
            } else {
                db_query('INSERT INTO finance_companies (name, slug, category, phone, whatsapp, email, website, address, description, rating, is_verified, is_featured, published) VALUES (:name, :slug, :category, :phone, :whatsapp, :email, :website, :address, :description, :rating, :is_verified, :is_featured, :published)', $data);
            }
            redirect('perusahaan.php?saved=1');
        }
    }
}

if (isset($_GET['edit'])) {
    $editing = db_fetch_one('SELECT * FROM finance_companies WHERE id = ?', [(int) $_GET['edit']]);
} elseif (isset($_GET['new'])) {
    $editing = [
        'id' => 0, 'name' => '', 'slug' => '', 'category' => 'Pinjaman Online',
        'phone' => '', 'whatsapp' => '', 'email' => '', 'website' => '',
        'address' => '', 'description' => '', 'rating' => 0,
        'is_verified' => 0, 'is_featured' => 0, 'views' => 0, 'published' => 1,
    ];
}

$companies = db_fetch_all('SELECT * FROM finance_companies ORDER BY is_featured DESC, name ASC');
$categories_list = db_fetch_all("SELECT DISTINCT category FROM finance_companies ORDER BY category");
?>
<h1 class="page-title">Direktori Perusahaan & Call Center</h1>

<?php if (isset($_GET['saved'])): ?><div class="alert success">Perusahaan tersimpan.</div><?php endif; ?>
<?php if (isset($_GET['deleted'])): ?><div class="alert success">Perusahaan dihapus.</div><?php endif; ?>
<?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

<?php if ($editing): ?>
<div class="panel">
  <h2><?= !empty($editing['id']) ? 'Edit' : 'Tambah' ?> Perusahaan</h2>
  <form method="post" class="form-grid">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= e((string) $editing['id']) ?>">
    <div class="field">
      <label>Nama Perusahaan *</label>
      <input type="text" name="name" value="<?= e($editing['name']) ?>" required placeholder="Contoh: EasyCash">
    </div>
    <div class="field">
      <label>Kategori *</label>
      <input type="text" name="category" value="<?= e($editing['category']) ?>" required list="cat-list" placeholder="Pinjaman Online / Bank Digital / Investasi / Asuransi / Fintech">
      <datalist id="cat-list">
        <?php foreach ($categories_list as $c): ?><option value="<?= e($c['category']) ?>"><?php endforeach; ?>
      </datalist>
    </div>
    <div class="field">
      <label>Nomor Telepon / Call Center</label>
      <input type="text" name="phone" value="<?= e($editing['phone']) ?>" placeholder="08xx-xxxx-xxxx">
    </div>
    <div class="field">
      <label>WhatsApp</label>
      <input type="text" name="whatsapp" value="<?= e($editing['whatsapp']) ?>" placeholder="628xxxxxxxxxx">
    </div>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" value="<?= e($editing['email']) ?>">
    </div>
    <div class="field">
      <label>Website</label>
      <input type="text" name="website" value="<?= e($editing['website']) ?>" placeholder="https://...">
    </div>
    <div class="field">
      <label>Rating (0 - 5)</label>
      <input type="number" name="rating" step="0.1" min="0" max="5" value="<?= e((string) $editing['rating']) ?>">
    </div>
    <div class="field">
      <label>Alamat</label>
      <input type="text" name="address" value="<?= e($editing['address']) ?>">
    </div>
    <div class="field span-2">
      <label>Deskripsi</label>
      <textarea name="description" rows="4" placeholder="Deskripsi layanan dan alasan pelanggan menghubungi call center ini..."><?= e($editing['description']) ?></textarea>
    </div>
    <div class="field span-2 checkbox-row">
      <label><input type="checkbox" name="is_verified" <?= $editing['is_verified'] ? 'checked' : '' ?>> Terverifikasi</label>
      <label><input type="checkbox" name="is_featured" <?= $editing['is_featured'] ? 'checked' : '' ?>> Featured (tampil di depan)</label>
      <label><input type="checkbox" name="published" <?= $editing['published'] ? 'checked' : '' ?>> Dipublikasikan</label>
    </div>
    <div class="form-actions span-2">
      <a href="perusahaan.php" class="btn btn-outline">Batal</a>
      <button type="submit" class="btn">Simpan</button>
    </div>
  </form>
</div>
<?php else: ?>
<div class="toolbar">
  <a href="perusahaan.php?new=1" class="btn">+ Tambah Perusahaan</a>
</div>
<?php endif; ?>

<?php if (!$editing): ?>
<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Nama</th><th>Kategori</th><th>Call Center</th><th>WhatsApp</th><th>Rating</th><th>Status</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($companies as $c): ?>
      <tr>
        <td>
          <strong><?= e($c['name']) ?></strong>
          <?php if ($c['is_featured']): ?><span class="badge badge-blue">Featured</span><?php endif; ?><br>
          <span class="muted">/<?= e($c['slug']) ?> · <?= number_format((int) $c['views'], 0, ',', '.') ?> views</span>
        </td>
        <td><?= e($c['category']) ?></td>
        <td><strong><?= e($c['phone']) ?: '-' ?></strong></td>
        <td><?= e($c['whatsapp']) ?: '-' ?></td>
        <td>⭐ <?= number_format((float) $c['rating'], 1) ?></td>
        <td>
          <?php if ($c['is_verified']): ?><span class="badge badge-green">Verified</span><?php else: ?><span class="badge badge-gray">Belum</span><?php endif; ?>
          <?php if (!$c['published']): ?><span class="badge badge-gray">Draft</span><?php endif; ?>
        </td>
        <td class="right">
          <a class="btn-sm" href="perusahaan.php?edit=<?= $c['id'] ?>">Edit</a>
          <form method="post" class="inline" onsubmit="return confirm('Hapus perusahaan ini?')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $c['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$companies): ?>
      <tr><td colspan="7" class="center muted">Belum ada perusahaan.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
