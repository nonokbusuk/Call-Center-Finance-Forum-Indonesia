<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'delete') {
        db_query('DELETE FROM menu_items WHERE id = ?', [(int) $_POST['id']]);
        redirect('menu.php?deleted=1');
    }
    if ($action === 'save') {
        $label = trim($_POST['label']);
        $url = trim($_POST['url']);
        if ($label === '' || $url === '') {
            $error = 'Label dan URL wajib diisi';
        } else {
            $data = [
                'label' => $label, 'url' => $url,
                'location' => in_array($_POST['location'], ['header', 'footer']) ? $_POST['location'] : 'header',
                'sort_order' => (int) ($_POST['sort_order'] ?: 0),
                'is_active' => isset($_POST['is_active']) ? 1 : 0,
            ];
            if (!empty($_POST['id'])) {
                $data['id'] = (int) $_POST['id'];
                db_query('UPDATE menu_items SET label=:label, url=:url, location=:location, sort_order=:sort_order, is_active=:is_active WHERE id=:id', $data);
            } else {
                db_query('INSERT INTO menu_items (label, url, location, sort_order, is_active) VALUES (:label, :url, :location, :sort_order, :is_active)', $data);
            }
            redirect('menu.php?saved=1');
        }
    }
}

$editing = null;
if (isset($_GET['edit'])) {
    $editing = db_fetch_one('SELECT * FROM menu_items WHERE id = ?', [(int) $_GET['edit']]);
} elseif (isset($_GET['new'])) {
    $editing = ['id' => 0, 'label' => '', 'url' => '', 'location' => 'header', 'sort_order' => 0, 'is_active' => 1];
}

$menus = db_fetch_all('SELECT * FROM menu_items ORDER BY location ASC, sort_order ASC');
?>
<h1 class="page-title">Menu Navigasi</h1>

<?php if (isset($_GET['saved'])): ?><div class="alert success">Menu tersimpan.</div><?php endif; ?>
<?php if (isset($_GET['deleted'])): ?><div class="alert success">Menu dihapus.</div><?php endif; ?>
<?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

<?php if ($editing): ?>
<div class="panel">
  <h2><?= !empty($editing['id']) ? 'Edit' : 'Tambah' ?> Item Menu</h2>
  <form method="post" class="form-grid">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= e((string) $editing['id']) ?>">
    <div class="field">
      <label>Label *</label>
      <input type="text" name="label" value="<?= e($editing['label']) ?>" required>
    </div>
    <div class="field">
      <label>URL *</label>
      <input type="text" name="url" value="<?= e($editing['url']) ?>" required placeholder="/forum/ atau https://...">
    </div>
    <div class="field">
      <label>Lokasi</label>
      <select name="location">
        <option value="header" <?= $editing['location'] === 'header' ? 'selected' : '' ?>>Header</option>
        <option value="footer" <?= $editing['location'] === 'footer' ? 'selected' : '' ?>>Footer</option>
      </select>
    </div>
    <div class="field">
      <label>Urutan</label>
      <input type="number" name="sort_order" value="<?= (int) $editing['sort_order'] ?>">
    </div>
    <div class="field span-2 checkbox-field">
      <label><input type="checkbox" name="is_active" <?= $editing['is_active'] ? 'checked' : '' ?>> Aktif (tampil di situs)</label>
    </div>
    <div class="form-actions span-2">
      <a href="menu.php" class="btn btn-outline">Batal</a>
      <button type="submit" class="btn">Simpan</button>
    </div>
  </form>
</div>
<?php else: ?>
<div class="toolbar">
  <a href="menu.php?new=1" class="btn">+ Tambah Menu</a>
</div>
<?php endif; ?>

<?php if (!$editing): ?>
<div class="panel table-wrap">
  <table>
    <thead>
      <tr><th>Label</th><th>URL</th><th>Lokasi</th><th>Urutan</th><th>Status</th><th class="right">Aksi</th></tr>
    </thead>
    <tbody>
      <?php foreach ($menus as $m): ?>
      <tr>
        <td><strong><?= e($m['label']) ?></strong></td>
        <td class="muted"><?= e($m['url']) ?></td>
        <td><?= e($m['location']) ?></td>
        <td><?= (int) $m['sort_order'] ?></td>
        <td><span class="badge <?= $m['is_active'] ? 'badge-green' : 'badge-gray' ?>"><?= $m['is_active'] ? 'Aktif' : 'Nonaktif' ?></span></td>
        <td class="right">
          <a class="btn-sm" href="menu.php?edit=<?= $m['id'] ?>">Edit</a>
          <form method="post" class="inline" onsubmit="return confirm('Hapus item menu ini?')">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="id" value="<?= $m['id'] ?>">
            <button type="submit" class="btn-sm btn-danger">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$menus): ?>
      <tr><td colspan="6" class="center muted">Belum ada menu.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
