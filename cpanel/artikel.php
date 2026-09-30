<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

$editing = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'delete') {
        db_query('DELETE FROM articles WHERE id = ?', [(int) $_POST['id']]);
        redirect('artikel.php?deleted=1');
    }
    if ($action === 'save') {
        $data = [
            'title' => trim($_POST['title']),
            'excerpt' => trim($_POST['excerpt']),
            'content' => $_POST['content'],
            'author' => trim($_POST['author']) ?: 'Tim Redaksi',
            'category' => trim($_POST['category']) ?: 'Fintech',
            'tags' => trim($_POST['tags']),
            'read_time' => max(1, (int) $_POST['read_time']),
            'image' => trim($_POST['image']),
            'published' => isset($_POST['published']) ? 1 : 0,
        ];
        if ($data['title'] === '' || $data['content'] === '') {
            $error = 'Judul dan konten wajib diisi';
        } else {
            $slug = slugify($data['title']);
            $existing = db_fetch_one('SELECT id FROM articles WHERE slug = ? AND id != ?', [$slug, (int) ($_POST['id'] ?? 0)]);
            if ($existing) $slug .= '-' . time();
            $data['slug'] = $slug;
            if (!empty($_POST['id'])) {
                $data['id'] = (int) $_POST['id'];
                $sql = 'UPDATE articles SET title=:title, slug=:slug, excerpt=:excerpt, content=:content, author=:author, category=:category, tags=:tags, read_time=:read_time, image=:image, published=:published WHERE id=:id';
                db_query($sql, $data);
            } else {
                db_query('INSERT INTO articles (title, slug, excerpt, content, author, category, tags, read_time, image, published) VALUES (:title, :slug, :excerpt, :content, :author, :category, :tags, :read_time, :image, :published)', $data);
            }
            redirect('artikel.php?saved=1');
        }
    }
}

if (isset($_GET['edit'])) {
    $editing = db_fetch_one('SELECT * FROM articles WHERE id = ?', [(int) $_GET['edit']]);
} elseif (isset($_GET['new'])) {
    $editing = [
        'id' => 0, 'title' => '', 'slug' => '', 'excerpt' => '', 'content' => '',
        'author' => 'Tim Redaksi', 'category' => 'Fintech', 'tags' => '',
        'read_time' => 5, 'views' => 0, 'image' => '', 'published' => 1,
        'publish_date' => date('Y-m-d H:i:s'),
    ];
}

$articles = db_fetch_all('SELECT * FROM articles ORDER BY publish_date DESC');
?>
<h1 class="page-title">Kelola Artikel</h1>

<?php if (isset($_GET['saved'])): ?><div class="alert success">Artikel tersimpan.</div><?php endif; ?>
<?php if (isset($_GET['deleted'])): ?><div class="alert success">Artikel dihapus.</div><?php endif; ?>
<?php if (!empty($error ?? '')): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

<?php if ($editing): ?>
<div class="panel">
  <h2><?= $editing && !empty($editing['id']) && isset($_GET['edit']) ? 'Edit Artikel' : 'Tambah Artikel' ?></h2>
  <form method="post" class="form-grid">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= e($editing['id']) ?>">
    <div class="field span-2">
      <label>Judul</label>
      <input type="text" name="title" value="<?= e($editing['title']) ?>" required>
    </div>
    <div class="field">
      <label>Penulis</label>
      <input type="text" name="author" value="<?= e($editing['author']) ?>">
    </div>
    <div class="field">
      <label>Kategori</label>
      <input type="text" name="category" value="<?= e($editing['category']) ?>">
    </div>
    <div class="field span-2">
      <label>Ringkasan (excerpt)</label>
      <textarea name="excerpt" rows="2"><?= e($editing['excerpt']) ?></textarea>
    </div>
    <div class="field span-2">
      <label>Konten (HTML)</label>
      <textarea name="content" rows="8" class="mono" required><?= e($editing['content']) ?></textarea>
    </div>
    <div class="field">
      <label>Tags (pisahkan koma)</label>
      <input type="text" name="tags" value="<?= e($editing['tags']) ?>">
    </div>
    <div class="field">
      <label>Waktu baca (menit)</label>
      <input type="number" name="read_time" min="1" value="<?= (int) $editing['read_time'] ?>">
    </div>
    <div class="field span-2">
      <label>URL Gambar</label>
      <input type="text" name="image" value="<?= e($editing['image']) ?>">
    </div>
    <div class="field span-2 checkbox-field">
      <label><input type="checkbox" name="published" <?= $editing['published'] ? 'checked' : '' ?>> Dipublikasikan</label>
    </div>
    <div class="form-actions span-2">
      <a href="artikel.php" class="btn btn-outline">Batal</a>
      <button type="submit" class="btn">Simpan</button>
    </div>
  </form>
</div>
<?php else: ?>
<div class="toolbar">
  <a href="artikel.php?new=1" class="btn">+ Tambah Artikel</a>
</div>
<?php endif; ?>

<?php if (!$editing): ?>
<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Judul</th><th>Kategori</th><th>Views</th><th>Status</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($articles as $a): ?>
      <tr>
        <td>
          <strong><?= e($a['title']) ?></strong><br>
          <span class="muted">/<?= e($a['slug']) ?></span>
        </td>
        <td><?= e($a['category']) ?></td>
        <td><?= number_format((int) $a['views'], 0, ',', '.') ?></td>
        <td><span class="badge <?= $a['published'] ? 'badge-green' : 'badge-gray' ?>"><?= $a['published'] ? 'Publish' : 'Draft' ?></span></td>
        <td class="right">
          <a class="btn-sm" href="artikel.php?edit=<?= $a['id'] ?>">Edit</a>
          <form method="post" class="inline" onsubmit="return confirm('Hapus artikel ini?')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $a['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$articles): ?>
      <tr><td colspan="5" class="center muted">Belum ada artikel.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
