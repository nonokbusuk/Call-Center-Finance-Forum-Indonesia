<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/includes/settings.php';

$saved = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $allowed = [
        'site_name', 'site_tagline', 'hero_title', 'hero_subtitle', 'announcement',
        'contact_phone', 'contact_email', 'contact_whatsapp', 'contact_address',
        'footer_description', 'meta_description', 'meta_keywords', 'google_analytics_id',
    ];
    foreach ($allowed as $key) {
        if (isset($_POST[$key])) {
            save_setting($key, trim($_POST[$key]));
        }
    }
    $saved = true;
    // reset cache statis helper
    get_all_settings(true);
}

$s = get_all_settings();
?>
<h1 class="page-title">Pengaturan Situs</h1>

<?php if ($saved): ?><div class="alert success">Pengaturan tersimpan.</div><?php endif; ?>

<form method="post">
  <div class="panel">
    <h2>Identitas Situs</h2>
    <div class="form-grid">
      <div class="field">
        <label>Nama Situs</label>
        <input type="text" name="site_name" value="<?= e($s['site_name'] ?? '') ?>">
      </div>
      <div class="field">
        <label>Tagline</label>
        <input type="text" name="site_tagline" value="<?= e($s['site_tagline'] ?? '') ?>">
      </div>
      <div class="field span-2">
        <label>Announcement Bar (kosongkan untuk sembunyikan)</label>
        <input type="text" name="announcement" value="<?= e($s['announcement'] ?? '') ?>" placeholder="Contoh: Waspadai penipuan mengatasnamakan pinjol!">
      </div>
    </div>
  </div>

  <div class="panel">
    <h2>Halaman Utama (Hero)</h2>
    <div class="form-grid">
      <div class="field">
        <label>Judul Hero</label>
        <input type="text" name="hero_title" value="<?= e($s['hero_title'] ?? '') ?>">
      </div>
      <div class="field">
        <label>Sub-judul Hero</label>
        <input type="text" name="hero_subtitle" value="<?= e($s['hero_subtitle'] ?? '') ?>">
      </div>
    </div>
  </div>

  <div class="panel">
    <h2>Kontak & Footer</h2>
    <div class="form-grid">
      <div class="field">
        <label>Telepon</label>
        <input type="text" name="contact_phone" value="<?= e($s['contact_phone'] ?? '') ?>">
      </div>
      <div class="field">
        <label>WhatsApp (mis. 62812xxxx)</label>
        <input type="text" name="contact_whatsapp" value="<?= e($s['contact_whatsapp'] ?? '') ?>">
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" name="contact_email" value="<?= e($s['contact_email'] ?? '') ?>">
      </div>
      <div class="field">
        <label>Alamat</label>
        <input type="text" name="contact_address" value="<?= e($s['contact_address'] ?? '') ?>">
      </div>
      <div class="field span-2">
        <label>Deskripsi Footer</label>
        <textarea name="footer_description" rows="2"><?= e($s['footer_description'] ?? '') ?></textarea>
      </div>
    </div>
  </div>

  <div class="panel">
    <h2>SEO</h2>
    <div class="form-grid">
      <div class="field span-2">
        <label>Meta Description</label>
        <textarea name="meta_description" rows="2"><?= e($s['meta_description'] ?? '') ?></textarea>
      </div>
      <div class="field span-2">
        <label>Meta Keywords (pisahkan koma)</label>
        <textarea name="meta_keywords" rows="2"><?= e($s['meta_keywords'] ?? '') ?></textarea>
      </div>
      <div class="field span-2">
        <label>Google Analytics ID (kosongkan jika tidak ada)</label>
        <input type="text" name="google_analytics_id" value="<?= e($s['google_analytics_id'] ?? '') ?>" placeholder="G-XXXXXXXXXX">
      </div>
    </div>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn">Simpan Semua Pengaturan</button>
  </div>
</form>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
