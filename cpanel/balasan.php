<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (($_POST['action'] ?? '') === 'delete') {
        db_query('DELETE FROM forum_replies WHERE id = ?', [(int) $_POST['id']]);
        redirect('balasan.php?deleted=1');
    }
}

$replies = db_fetch_all(
    'SELECT r.*, t.title AS thread_title, t.slug AS thread_slug
     FROM forum_replies r JOIN forum_threads t ON t.id = r.thread_id
     ORDER BY r.created_at DESC'
);
?>
<h1 class="page-title">Moderasi Balasan</h1>

<?php if (isset($_GET['deleted'])): ?><div class="alert success">Balasan dihapus.</div><?php endif; ?>

<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Balasan</th><th>Thread</th><th>Penulis</th><th>Tanggal</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($replies as $r): ?>
      <tr>
        <td class="wrap-cell"><?= nl2br(e($r['content'])) ?></td>
        <td><span class="truncate"><?= e($r['thread_title']) ?></span></td>
        <td><span class="badge badge-gray"><?= e($r['author']) ?></span></td>
        <td class="muted"><?= date('d/m/Y H:i', strtotime($r['created_at'])) ?></td>
        <td class="right">
          <form method="post" class="inline" onsubmit="return confirm('Hapus balasan ini?')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $r['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$replies): ?>
      <tr><td colspan="5" class="center muted">Belum ada balasan.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
