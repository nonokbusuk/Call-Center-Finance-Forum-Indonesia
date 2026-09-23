<?php
// artikel.php - render single article page from database (SEO-friendly)
// URL: /artikel.php?slug=xxx  (rewrite ke /artikel/xxx/ via .htaccess)
require __DIR__ . '/config.php';

$slug = trim($_GET['slug'] ?? '');
if ($slug === '') { http_response_code(404); include __DIR__ . '/../404.html'; exit; }

$stmt = db()->prepare('SELECT * FROM articles WHERE slug = ? AND status = "published" LIMIT 1');
$stmt->execute([$slug]);
$article = $stmt->fetch();

if (!$article) { http_response_code(404); include __DIR__ . '/../404.html'; exit; }

// increment views
db()->prepare('UPDATE articles SET views = views + 1 WHERE id = ?')->execute([$article['id']]);

$tags = $article['tags'] ? array_map('trim', explode(',', $article['tags'])) : [];
$keywords = $article['meta_keywords'] ?: implode(', ', $tags);
$title = $article['meta_title'] ?: $article['title'];
$desc = $article['meta_description'] ?: $article['excerpt'];
$canonical = $article['canonical'] ?: SITE_URL . '/artikel/' . $article['slug'] . '/';
$ogTitle = $article['og_title'] ?: $article['title'];
$ogDesc = $article['og_description'] ?: $desc;
$image = $article['image'] ?: '';
$siteName = 'Call Center Finance Indonesia';
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= htmlspecialchars($title) ?></title>
<meta name="description" content="<?= htmlspecialchars($desc) ?>">
<meta name="keywords" content="<?= htmlspecialchars($keywords) ?>">
<link rel="canonical" href="<?= htmlspecialchars($canonical) ?>">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="<?= htmlspecialchars($ogTitle) ?>">
<meta property="og:description" content="<?= htmlspecialchars($ogDesc) ?>">
<meta property="og:url" content="<?= htmlspecialchars($canonical) ?>">
<meta property="og:site_name" content="<?= htmlspecialchars($siteName) ?>">
<?php if ($image): ?><meta property="og:image" content="<?= htmlspecialchars($image) ?>"><?php endif; ?>

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= htmlspecialchars($ogTitle) ?>">
<meta name="twitter:description" content="<?= htmlspecialchars($ogDesc) ?>">
<?php if ($image): ?><meta name="twitter:image" content="<?= htmlspecialchars($image) ?>"><?php endif; ?>

<link rel="icon" href="/favicon.ico">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>body{font-family:Inter,sans-serif}.finance-text-gradient{background:linear-gradient(to right,#1E3A8A,#F59E0B);-webkit-background-clip:text;background-clip:text;color:transparent}</style>

<!-- JSON-LD Article Schema -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"NewsArticle","headline":<?= json_encode($article['title']) ?>,"description":<?= json_encode($desc) ?>,"author":{"@type":"Person","name":<?= json_encode($article['author']) ?>},"publisher":{"@type":"Organization","name":<?= json_encode($siteName) ?>},"datePublished":"<?= htmlspecialchars($article['publish_date']) ?>","mainEntityOfPage":{"@type":"WebPage","@id":<?= json_encode($canonical) ?>}<?php if($image):?>,"image":<?= json_encode($image) ?><?php endif;?>}
</script>
<!-- JSON-LD Breadcrumb -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"<?= rtrim(SITE_URL,'/') ?>/"},{"@type":"ListItem","position":2,"name":"Artikel","item":"<?= rtrim(SITE_URL,'/') ?>/artikel/"},{"@type":"ListItem","position":3,"name":<?= json_encode($article['title']) ?>,"item":<?= json_encode($canonical) ?>}]}
</script>
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
      <a href="/artikel/" class="hover:text-blue-700">Artikel</a>
      <a href="/ojk-regulasi/" class="hover:text-blue-700">OJK & Regulasi</a>
      <a href="/edukasi-keuangan/" class="hover:text-blue-700">Edukasi</a>
      <a href="/kontak/" class="hover:text-blue-700">Kontak</a>
    </nav>
    <a href="/login/" class="text-sm font-medium hover:text-blue-700">Login</a>
  </div>
</header>

<main class="container mx-auto px-4 py-8 max-w-3xl">
  <a href="/artikel/" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 mb-6">&larr; Kembali ke Artikel</a>

  <div class="flex items-center gap-2 mb-3">
    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded"><?= htmlspecialchars($article['category']) ?></span>
    <span class="text-sm text-gray-500"><?= date('d M Y', strtotime($article['publish_date'])) ?></span>
    <span class="text-sm text-gray-500">• <?= (int)$article['read_time'] ?> menit baca</span>
  </div>

  <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4"><?= htmlspecialchars($article['title']) ?></h1>
  <p class="text-lg text-gray-600 mb-6"><?= htmlspecialchars($article['excerpt']) ?></p>

  <div class="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b">
    <span>oleh <strong class="text-gray-700"><?= htmlspecialchars($article['author']) ?></strong></span>
    <span>•</span>
    <span><?= (int)$article['views'] ?> views</span>
  </div>

  <?php if ($image): ?>
    <img src="<?= htmlspecialchars($image) ?>" alt="<?= htmlspecialchars($article['title']) ?>" class="w-full rounded-lg mb-8 max-h-96 object-cover">
  <?php endif; ?>

  <article class="prose prose-lg max-w-none text-gray-700 [&_a]:text-blue-700 [&_a]:underline">
    <?= $article['content'] ?>
  </article>

  <?php if ($tags): ?>
    <div class="flex flex-wrap gap-2 mt-8">
      <?php foreach ($tags as $t): ?>
        <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded">#<?= htmlspecialchars($t) ?></span>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>

  <div class="flex items-center gap-2 mt-8 pt-6 border-t">
    <span class="text-sm text-gray-500 mr-4">Bagikan:</span>
    <a href="https://wa.me/?text=<?= urlencode($article['title'] . ' ' . $canonical) ?>" target="_blank" rel="noopener" class="text-gray-500 hover:text-green-600 text-sm">WhatsApp</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=<?= urlencode($canonical) ?>" target="_blank" rel="noopener" class="text-gray-500 hover:text-blue-600 text-sm">Facebook</a>
    <a href="https://twitter.com/intent/tweet?text=<?= urlencode($article['title']) ?>&url=<?= urlencode($canonical) ?>" target="_blank" rel="noopener" class="text-gray-500 hover:text-sky-500 text-sm">Twitter</a>
  </div>
</main>

<footer class="bg-blue-900 text-white mt-16">
  <div class="container mx-auto px-4 py-8 text-center text-sm text-blue-100">
    <p>&copy; 2024 Call Center Finance Indonesia. All rights reserved.</p>
  </div>
</footer>
</body>
</html>
