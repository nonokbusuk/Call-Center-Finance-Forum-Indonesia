<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/helpers.php';
$admin = require_admin();
$current = basename($_SERVER['PHP_SELF']);
$nav_items = [
    'index.php' => ['Dashboard', '📊'],
    'pengaturan.php' => ['Pengaturan Situs', '⚙️'],
    'halaman.php' => ['Halaman (CMS)', '📄'],
    'menu.php' => ['Menu Navigasi', '🧭'],
    'artikel.php' => ['Artikel', '📰'],
    'threads.php' => ['Thread Forum', '💬'],
    'balasan.php' => ['Balasan', '🗨️'],
    'kategori.php' => ['Kategori', '📁'],
    'perusahaan.php' => ['Direktori Perusahaan', '🏢'],
    'keyword.php' => ['Keyword Trend', '🔍'],
    'pesan.php' => ['Pesan Kontak', '✉️'],
];
$unread = (int) db_fetch_one('SELECT COUNT(*) AS c FROM contact_messages WHERE is_read = 0')['c'];
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Admin Panel | Call Center Finance Indonesia</title>
<link rel="stylesheet" href="assets/admin.css?v=3">
</head>
<body>
<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <h1>Admin Panel</h1>
      <p>Call Center Finance</p>
    </div>
    <nav class="sidebar-nav">
      <?php foreach ($nav_items as $file => [$label, $icon]): ?>
        <a href="<?= $file ?>" class="<?= $current === $file ? 'active' : '' ?>">
          <span class="icon"><?= $icon ?></span><?= $label ?>
          <?php if ($file === 'pesan.php' && $unread > 0): ?>
            <span class="badge-unread"><?= $unread ?></span>
          <?php endif; ?>
        </a>
      <?php endforeach; ?>
    </nav>
    <div class="sidebar-footer">
      <a href="logout.php" class="btn-logout">⏻ Keluar</a>
    </div>
  </aside>
  <div class="main">
    <header class="topbar">
      <span>Masuk sebagai <strong><?= e($admin['name']) ?></strong></span>
    </header>
    <main class="content">
