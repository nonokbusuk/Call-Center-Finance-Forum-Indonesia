<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

$editing = null;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'delete') {
        db_query('DELETE FROM pages WHERE id = ?', [(int) $_POST['id']]);
        redirect('halaman.php?deleted=1');
    }
    if ($action === 'save') {
        $title = trim($_POST['title']);
        $slug = slugify($_POST['slug'] ?: $title);
        if ($title === '' || trim($_POST['content'] ?? '') === '') {
            $error = 'Judul dan konten wajib diisi';
        } else {
            $existing = db_fetch_one('SELECT id FROM pages WHERE slug = ? AND id != ?', [$slug, (int) ($_POST['id'] ?? 0)]);
            if ($existing) $slug .= '-' . time();
            $data = [
                'title' => $title, 'slug' => $slug,
                'content' => $_POST['content'],
                'meta_title' => trim($_POST['meta_title']),
                'meta_description' => trim($_POST['meta_description']),
                'published' => isset($_POST['published']) ? 1 : 0,
            ];
            if (!empty($_POST['id'])) {
                $data['id'] = (int) $_POST['id'];
                db_query('UPDATE pages SET title=:title, slug=:slug, content=:content, meta_title=:meta_title, meta_description=:meta_description, published=:published WHERE id=:id', $data);
            } else {
                db_query('INSERT INTO pages (title, slug, content, meta_title, meta_description, published) VALUES (:title, :slug, :content, :meta_title, :meta_description, :published)', $data);
            }
            redirect('halaman.php?saved=1');
        }
    }
}

if (isset($_GET['edit'])) {
    $editing = db_fetch_one('SELECT * FROM pages WHERE id = ?', [(int) $_GET['edit']]);
} elseif (isset($_GET['new'])) {
    $editing = ['id' => 0, 'title' => '', 'slug' => '', 'content' => '', 'meta_title' => '', 'meta_description' => '', 'published' => 1];
}

$pages = db_fetch_all('SELECT * FROM pages ORDER BY title ASC');
?>
<h1 class="page-title">Kelola Halaman (CMS)</h1>

<?php if (isset($_GET['saved'])): ?><div class="alert success">Halaman tersimpan.</div><?php endif; ?>
<?php if (isset($_GET['deleted'])): ?><div class="alert success">Halaman dihapus.</div><?php endif; ?>
<?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

<?php if ($editing): ?>
<div class="panel">
  <h2><?= !empty($editing['id']) ? 'Edit' : 'Tambah' ?> Halaman</h2>
  <form method="post" class="form-grid">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= e((string) $editing['id']) ?>">
    <div class="field span-2">
      <label>Judul Halaman *</label>
      <input type="text" name="title" value="<?= e($editing['title']) ?>" required>
    </div>
    <div class="field span-2">
      <label>Slug URL (kosongkan = otomatis dari judul)</label>
      <input type="text" name="slug" value="<?= e($editing['slug']) ?>" placeholder="tentang-kami">
    </div>
    <div class="field span-2">
      <label>Konten (HTML) *</label>
      <textarea name="content" rows="10" class="mono" required><?= e($editing['content']) ?></textarea>
    </div>
    <div class="field">
      <label>Meta Title (SEO)</label>
      <input type="text" name="meta_title" value="<?= e($editing['meta_title']) ?>">
    </div>
    <div class="field">
      <label>Meta Description (SEO)</label>
      <input type="text" name="meta_description" value="<?= e($editing['meta_description']) ?>">
    </div>
    <div class="field span-2 checkbox-field">
      <label><input type="checkbox" name="published" <?= $editing['published'] ? 'checked' : '' ?>> Dipublikasikan</label>
    </div>
    <div class="form-actions span-2">
      <a href="halaman.php" class="btn btn-outline">Batal</a>
      <button type="submit" class="btn">Simpan</button>
    </div>
  </form>
</div>
<?php else: ?>
<div class="toolbar">
  <a href="halaman.php?new=1" class="btn">+ Tambah Halaman</a>
</div>
<?php endif; ?>

<?php if (!$editing): ?>
<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Judul</th><th>URL</th><th>Status</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($pages as $p): ?>
      <tr>
        <td><strong><?= e($p['title']) ?></strong></td>
        <td class="muted">/<?= e($p['slug']) ?>/</td>
        <td><span class="badge <?= $p['published'] ? 'badge-green' : 'badge-gray' ?>"><?= $p['published'] ? 'Publish' : 'Draft' ?></span></td>
        <td class="right">
          <a class="btn-sm" href="halaman.php?edit=<?= $p['id'] ?>">Edit</a>
          <form method="post" class="inline" onsubmit="return confirm('Hapus halaman ini?')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $p['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$pages): ?>
      <tr><td colspan="4" class="center muted">Belum ada halaman custom.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
