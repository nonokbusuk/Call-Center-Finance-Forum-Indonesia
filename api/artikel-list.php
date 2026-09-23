<?php
// artikel-list.php - halaman daftar artikel dari database (SEO friendly)
// Akses via /artikel/ melalui .htaccess
require __DIR__ . '/config.php';

$siteName = 'Call Center Finance Indonesia';
try {
  $stmt = db()->query('SELECT id, title, slug, excerpt, author, category, tags, image, publish_date, read_time, views FROM articles WHERE status = "published" ORDER BY publish_date DESC, id DESC');
  $articles = $stmt->fetchAll();
} catch (Exception $e) { $articles = []; }
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Artikel & Berita Keuangan | Call Center Finance Indonesia</title>
<meta name="description" content="Kumpulan artikel dan berita terbaru seputar keuangan, fintech, investasi, perbankan, dan OJK di Indonesia.">
<meta name="keywords" content="artikel keuangan, berita fintech, investasi, perbankan, OJK, cryptocurrency">
<link rel="canonical" href="<?= rtrim(SITE_URL,'/') ?>/artikel/">
<meta name="robots" content="index, follow">
<meta property="og:type" content="website">
<meta property="og:title" content="Artikel & Berita Keuangan | Call Center Finance Indonesia">
<meta property="og:description" content="Artikel dan berita terbaru seputar keuangan, fintech, investasi, perbankan, dan OJK.">
<link rel="icon" href="/favicon.ico">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>body{font-family:Inter,sans-serif}.finance-text-gradient{background:linear-gradient(to right,#1E3A8A,#F59E0B);-webkit-background-clip:text;background-clip:text;color:transparent}</style>
</head>
<body class="bg-white text-gray-900">
<header class="sticky top-0 z-50 bg-white/95 border-b backdrop-blur">
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <img src="https://cdn-ai.onspace.ai/onspace/project/image/2hGG6P7tn8CTHN87f9mtSp/call-center.png" alt="Call Center Finance" class="h-10" loading="lazy">
      <span class="text-xl font-bold finance-text-gradient hidden sm:block">call-center.id</span>
    </a>
    <nav class="hidden md:flex gap-6 text-sm font-medium">
      <a href="/" class="hover:text-blue-700">Home</a>
      <a href="/forum/" class="hover:text-blue-700">Forum</a>
      <a href="/artikel/" class="text-blue-700 font-semibold">Artikel</a>
      <a href="/ojk-regulasi/" class="hover:text-blue-700">OJK & Regulasi</a>
      <a href="/edukasi-keuangan/" class="hover:text-blue-700">Edukasi</a>
      <a href="/kontak/" class="hover:text-blue-700">Kontak</a>
    </nav>
    <a href="/login/" class="text-sm font-medium hover:text-blue-700">Login</a>
  </div>
</header>

<main class="container mx-auto px-4 py-10">
  <h1 class="text-3xl md:text-4xl font-bold mb-2">Artikel & Berita Keuangan</h1>
  <p class="text-gray-500 mb-8">Berita dan insight terbaru seputar keuangan, fintech, investasi, perbankan, dan OJK.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <?php if (empty($articles)): ?>
      <p class="col-span-full text-center text-gray-400 py-12">Belum ada artikel. Tambahkan dari dashboard admin.</p>
    <?php else: foreach ($articles as $a): ?>
      <?php $tags = $a['tags'] ? array_map('trim', explode(',', $a['tags'])) : []; ?>
      <article class="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
        <?php if ($a['image']): ?>
          <a href="/artikel/<?= htmlspecialchars($a['slug']) ?>/">
            <img src="<?= htmlspecialchars($a['image']) ?>" alt="<?= htmlspecialchars($a['title']) ?>" class="w-full h-48 object-cover" loading="lazy">
          </a>
        <?php endif; ?>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded"><?= htmlspecialchars($a['category']) ?></span>
            <span class="text-xs text-gray-400"><?= date('d M Y', strtotime($a['publish_date'])) ?></span>
          </div>
          <h2 class="text-lg font-bold mb-2"><a href="/artikel/<?= htmlspecialchars($a['slug']) ?>/" class="hover:text-blue-700"><?= htmlspecialchars($a['title']) ?></a></h2>
          <p class="text-sm text-gray-600 mb-3 line-clamp-2"><?= htmlspecialchars($a['excerpt']) ?></p>
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span>oleh <?= htmlspecialchars($a['author']) ?> • <?= (int)$a['read_time'] ?> menit</span>
            <span><?= (int)$a['views'] ?> views</span>
          </div>
        </div>
      </article>
    <?php endforeach; endif; ?>
  </div>
</main>

<footer class="bg-blue-900 text-white mt-16">
  <div class="container mx-auto px-4 py-8 text-center text-sm text-blue-100">
    <p>&copy; 2024 Call Center Finance Indonesia. All rights reserved.</p>
  </div>
</footer>
</body>
</html>
