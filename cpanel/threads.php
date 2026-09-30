<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

$editing = null;
$categories = db_fetch_all('SELECT * FROM forum_categories ORDER BY sort_order ASC');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'delete') {
        db_query('DELETE FROM forum_threads WHERE id = ?', [(int) $_POST['id']]);
        redirect('threads.php?deleted=1');
    }
    if ($action === 'save') {
        $title = trim($_POST['title']);
        $content = trim($_POST['content']);
        $categoryId = (int) $_POST['category_id'];
        if ($title === '' || $content === '' || !$categoryId) {
            $error = 'Judul, konten, dan kategori wajib diisi';
        } else {
            $slug = slugify($title);
            $existing = db_fetch_one('SELECT id FROM forum_threads WHERE slug = ? AND id != ?', [$slug, (int) ($_POST['id'] ?? 0)]);
            if ($existing) $slug .= '-' . time();
            if (!empty($_POST['id'])) {
                db_query(
                    'UPDATE forum_threads SET title = ?, slug = ?, content = ?, is_pinned = ?, is_locked = ?, category_id = ? WHERE id = ?',
                    [$title, $slug, $content, isset($_POST['is_pinned']) ? 1 : 0, isset($_POST['is_locked']) ? 1 : 0, $categoryId, (int) $_POST['id']]
                );
            } else {
                db_query(
                    'INSERT INTO forum_threads (title, slug, content, author, is_pinned, is_locked, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [$title, $slug, $content, trim($_POST['author']) ?: 'Admin', isset($_POST['is_pinned']) ? 1 : 0, isset($_POST['is_locked']) ? 1 : 0, $categoryId]
                );
            }
            redirect('threads.php?saved=1');
        }
    }
}

if (isset($_GET['edit'])) {
    $editing = db_fetch_one('SELECT * FROM forum_threads WHERE id = ?', [(int) $_GET['edit']]);
} elseif (isset($_GET['new'])) {
    $editing = [
        'id' => 0, 'title' => '', 'slug' => '', 'content' => '', 'author' => 'Admin',
        'is_pinned' => 0, 'is_locked' => 0, 'category_id' => $categories[0]['id'] ?? 0,
    ];
}

$threads = db_fetch_all(
    'SELECT t.*, c.name AS category_name, (SELECT COUNT(*) FROM forum_replies r WHERE r.thread_id = t.id) AS reply_count
     FROM forum_threads t JOIN forum_categories c ON c.id = t.category_id
     ORDER BY t.is_pinned DESC, t.created_at DESC'
);
?>
<h1 class="page-title">Kelola Thread Forum</h1>

<?php if (isset($_GET['saved'])): ?><div class="alert success">Thread tersimpan.</div><?php endif; ?>
<?php if (isset($_GET['deleted'])): ?><div class="alert success">Thread dihapus.</div><?php endif; ?>
<?php if (!empty($error ?? '')): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

<?php if ($editing): ?>
<div class="panel">
  <h2><?= !empty($editing['id']) ? 'Edit Thread' : 'Tambah Thread' ?></h2>
  <form method="post" class="form-grid">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= e((string) $editing['id']) ?>">
    <div class="field span-2">
      <label>Judul</label>
      <input type="text" name="title" value="<?= e($editing['title']) ?>" required>
    </div>
    <div class="field">
      <label>Kategori</label>
      <select name="category_id" required>
        <?php foreach ($categories as $c): ?>
          <option value="<?= $c['id'] ?>" <?= (int) $editing['category_id'] === (int) $c['id'] ? 'selected' : '' ?>><?= e($c['name']) ?></option>
        <?php endforeach; ?>
      </select>
    </div>
    <div class="field">
      <label>Penulis</label>
      <input type="text" name="author" value="<?= e($editing['author']) ?>">
    </div>
    <div class="field span-2">
      <label>Konten</label>
      <textarea name="content" rows="5" required><?= e($editing['content']) ?></textarea>
    </div>
    <div class="field span-2 checkbox-row">
      <label><input type="checkbox" name="is_pinned" <?= $editing['is_pinned'] ? 'checked' : '' ?>> Pin (sematkan di atas)</label>
      <label><input type="checkbox" name="is_locked" <?= $editing['is_locked'] ? 'checked' : '' ?>> Lock (kunci diskusi)</label>
    </div>
    <div class="form-actions span-2">
      <a href="threads.php" class="btn btn-outline">Batal</a>
      <button type="submit" class="btn">Simpan</button>
    </div>
  </form>
</div>
<?php else: ?>
<div class="toolbar">
  <a href="threads.php?new=1" class="btn">+ Tambah Thread</a>
</div>
<?php endif; ?>

<?php if (!$editing): ?>
<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Judul</th><th>Kategori</th><th>Balasan</th><th>Views</th><th>Status</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($threads as $t): ?>
      <tr>
        <td>
          <strong><?= e($t['title']) ?></strong><br>
          <span class="muted">oleh <?= e($t['author']) ?></span>
        </td>
        <td><?= e($t['category_name']) ?></td>
        <td><?= (int) $t['reply_count'] ?></td>
        <td><?= number_format((int) $t['views'], 0, ',', '.') ?></td>
        <td>
          <?php if ($t['is_pinned']): ?><span class="badge badge-blue">Pin</span><?php endif; ?>
          <?php if ($t['is_locked']): ?><span class="badge badge-gray">Lock</span><?php endif; ?>
          <?php if (!$t['is_pinned'] && !$t['is_locked']): ?><span class="muted">Aktif</span><?php endif; ?>
        </td>
        <td class="right">
          <a class="btn-sm" href="threads.php?edit=<?= $t['id'] ?>">Edit</a>
          <form method="post" class="inline" onsubmit="return confirm('Hapus thread ini? Semua balasan juga terhapus.')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $t['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$threads): ?>
      <tr><td colspan="6" class="center muted">Belum ada thread.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
