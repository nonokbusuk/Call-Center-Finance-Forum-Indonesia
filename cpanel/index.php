<?php
require_once __DIR__ . '/includes/header.php';

$stats = [
    'artikel' => (int) db_fetch_one('SELECT COUNT(*) AS c FROM articles')['c'],
    'threads' => (int) db_fetch_one('SELECT COUNT(*) AS c FROM forum_threads')['c'],
    'replies' => (int) db_fetch_one('SELECT COUNT(*) AS c FROM forum_replies')['c'],
    'messages' => (int) db_fetch_one('SELECT COUNT(*) AS c FROM contact_messages')['c'],
    'companies' => (int) db_fetch_one('SELECT COUNT(*) AS c FROM finance_companies WHERE published = 1')['c'],
    'keywords' => (int) db_fetch_one('SELECT COUNT(*) AS c FROM keywords')['c'],
    'pages' => (int) db_fetch_one('SELECT COUNT(*) AS c FROM pages')['c'],
];
$unread = (int) db_fetch_one('SELECT COUNT(*) AS c FROM contact_messages WHERE is_read = 0')['c'];
$recent_articles = db_fetch_all('SELECT title, slug, publish_date FROM articles ORDER BY publish_date DESC LIMIT 5');
$recent_threads = db_fetch_all('SELECT t.title, c.name AS category FROM forum_threads t JOIN forum_categories c ON c.id = t.category_id ORDER BY t.created_at DESC LIMIT 5');
?>
<h1 class="page-title">Dashboard</h1>

<div class="stats-grid">
  <a href="artikel.php" class="stat-card">
    <span class="stat-label">Artikel</span>
    <span class="stat-value"><?= $stats['artikel'] ?></span>
  </a>
  <a href="threads.php" class="stat-card">
    <span class="stat-label">Thread Forum</span>
    <span class="stat-value"><?= $stats['threads'] ?></span>
  </a>
  <a href="balasan.php" class="stat-card">
    <span class="stat-label">Balasan</span>
    <span class="stat-value"><?= $stats['replies'] ?></span>
  </a>
  <a href="pesan.php" class="stat-card">
    <span class="stat-label">Pesan<?= $unread > 0 ? ' (' . $unread . ' baru)' : '' ?></span>
    <span class="stat-value"><?= $stats['messages'] ?></span>
  </a>
  <a href="perusahaan.php" class="stat-card">
    <span class="stat-label">Perusahaan Finance</span>
    <span class="stat-value"><?= $stats['companies'] ?></span>
  </a>
  <a href="keyword.php" class="stat-card">
    <span class="stat-label">Keyword Dipantau</span>
    <span class="stat-value"><?= $stats['keywords'] ?></span>
  </a>
  <a href="halaman.php" class="stat-card">
    <span class="stat-label">Halaman CMS</span>
    <span class="stat-value"><?= $stats['pages'] ?></span>
  </a>
</div>

<div class="grid-2">
  <div class="panel">
    <h2>Artikel Terbaru</h2>
    <?php if ($recent_articles): ?>
      <ul class="recent-list">
        <?php foreach ($recent_articles as $a): ?>
          <li>
            <span class="truncate"><?= e($a['title']) ?></span>
            <span class="muted"><?= format_date($a['publish_date']) ?></span>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php else: ?>
      <p class="muted">Belum ada artikel.</p>
    <?php endif; ?>
  </div>
  <div class="panel">
    <h2>Thread Terbaru</h2>
    <?php if ($recent_threads): ?>
      <ul class="recent-list">
        <?php foreach ($recent_threads as $t): ?>
          <li>
            <span class="truncate"><?= e($t['title']) ?></span>
            <span class="muted"><?= e($t['category']) ?></span>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php else: ?>
      <p class="muted">Belum ada thread.</p>
    <?php endif; ?>
  </div>
</div>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
