<?php
// Generate sitemap.xml dynamically from articles in database
// Output: application/xml
require __DIR__ . '/config.php';

header('Content-Type: application/xml; charset=utf-8');

$base = rtrim(SITE_URL, '/');

// Static pages
$static = ['/', '/forum/', '/artikel/', '/ojk-regulasi/', '/edukasi-keuangan/', '/kontak/', '/login/', '/register/'];

// Dynamic article pages
try {
  $stmt = db()->query('SELECT slug, publish_date, updated_at FROM articles WHERE status = "published" ORDER BY publish_date DESC');
  $articles = $stmt->fetchAll();
} catch (Exception $e) {
  $articles = [];
}

// Forum categories
$categories = ['pinjaman-online/', 'perbankan/', 'investasi/', 'asuransi/', 'fintech/', 'ojk-regulasi/'];

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($static as $p) {
  echo "  <url>\n    <loc>" . htmlspecialchars($base . $p) . "</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n";
}
foreach ($categories as $c) {
  echo "  <url>\n    <loc>" . htmlspecialchars($base . '/forum/' . $c) . "</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n";
}
foreach ($articles as $a) {
  $lastmod = !empty($a['updated_at']) ? date('Y-m-d', strtotime($a['updated_at'])) : ($a['publish_date'] ?? date('Y-m-d'));
  echo "  <url>\n    <loc>" . htmlspecialchars($base . '/artikel/' . $a['slug'] . '/') . "</loc>\n    <lastmod>" . $lastmod . "</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n";
}

echo '</urlset>';
