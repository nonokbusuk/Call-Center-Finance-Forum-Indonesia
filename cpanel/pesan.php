<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'delete') {
        db_query('DELETE FROM contact_messages WHERE id = ?', [(int) $_POST['id']]);
        redirect('pesan.php?deleted=1');
    }
    if ($action === 'toggle_read') {
        db_query('UPDATE contact_messages SET is_read = 1 - is_read WHERE id = ?', [(int) $_POST['id']]);
        redirect('pesan.php');
    }
}

$messages = db_fetch_all('SELECT * FROM contact_messages ORDER BY is_read ASC, created_at DESC');
?>
<h1 class="page-title">Pesan Kontak</h1>

<?php if (isset($_GET['deleted'])): ?><div class="alert success">Pesan dihapus.</div><?php endif; ?>

<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Pengirim</th><th>Subjek</th><th>Tanggal</th><th>Status</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($messages as $m): ?>
      <tr class="<?= $m['is_read'] ? '' : 'row-unread' ?>">
        <td>
          <strong><?= e($m['name']) ?></strong><br>
          <span class="muted"><?= e($m['email']) ?></span>
          <div class="message-body"><?= nl2br(e($m['message'])) ?></div>
        </td>
        <td><?= e($m['subject']) ?></td>
        <td class="muted"><?= date('d/m/Y H:i', strtotime($m['created_at'])) ?></td>
        <td><span class="badge <?= $m['is_read'] ? 'badge-gray' : 'badge-blue' ?>"><?= $m['is_read'] ? 'Dibaca' : 'Baru' ?></span></td>
        <td class="right">
          <form method="post" class="inline">
            <input type="hidden" name="action" value="toggle_read">
            <input type="hidden" name="id" value="<?= $m['id'] ?>">
            <button type="submit" class="btn-sm"><?= $m['is_read'] ? 'Tandai Baru' : 'Tandai Dibaca' ?></button>
          </form>
          <form method="post" class="inline" onsubmit="return confirm('Hapus pesan ini?')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $m['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$messages): ?>
      <tr><td colspan="5" class="center muted">Belum ada pesan.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
