const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://www.call-center.id';
const OUTPUT_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'sitemap.xml');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Static pages
const staticPages = [
  { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: '2024-01-15' },
  { loc: '/forum/', changefreq: 'hourly', priority: 0.9, lastmod: '2024-01-15' },
  { loc: '/artikel/', changefreq: 'daily', priority: 0.8, lastmod: '2024-01-15' },
  { loc: '/ojk-regulasi/', changefreq: 'weekly', priority: 0.8, lastmod: '2024-01-15' },
  { loc: '/edukasi-keuangan/', changefreq: 'weekly', priority: 0.7, lastmod: '2024-01-15' },
  { loc: '/kontak/', changefreq: 'monthly', priority: 0.6, lastmod: '2024-01-15' },
  { loc: '/login/', changefreq: 'monthly', priority: 0.5, lastmod: '2024-01-15' },
  { loc: '/register/', changefreq: 'monthly', priority: 0.5, lastmod: '2024-01-15' },
];

// Forum categories
const forumCategories = [
  'pinjaman-online',
  'perbankan',
  'investasi',
  'asuransi',
  'fintech',
  'ojk-regulasi',
];

// Forum category pages
const forumCategoryPages = forumCategories.map(category => ({
  loc: `/forum/${category}/`,
  changefreq: 'daily',
  priority: 0.8,
  lastmod: '2024-01-15',
}));

// Sample forum threads
const forumThreads = [
  { slug: 'bagaimana-cara-keluar-dari-jeratan-pinjol-ilegal', lastmod: '2024-01-15' },
  { slug: 'review-bank-digital-jenius-vs-bank-jago', lastmod: '2024-01-14' },
  { slug: 'tips-investasi-saham-untuk-gaji-umr', lastmod: '2024-01-13' },
  { slug: 'asuransi-kesehatan-swasta-vs-bpjs-perbandingan-lengkap', lastmod: '2024-01-12' },
  { slug: 'update-regulasi-ojk-terbaru-untuk-p2p-lending', lastmod: '2024-01-11' },
];

// Forum thread pages
const forumThreadPages = forumThreads.map(thread => ({
  loc: `/forum/${thread.slug}/`,
  changefreq: 'daily',
  priority: 0.7,
  lastmod: thread.lastmod,
}));

// Sample articles
const articles = [
  { slug: 'ojk-luncurkan-roadmap-pengembangan-fintech-2024-2029', lastmod: '2024-01-15' },
  { slug: 'tren-investasi-cryptocurrency-di-indonesia-2024', lastmod: '2024-01-14' },
  { slug: 'perbandingan-bunga-deposito-bank-digital-vs-konvensional', lastmod: '2024-01-13' },
  { slug: 'cara-memilih-asuransi-jiwa-untuk-keluarga-muda', lastmod: '2024-01-12' },
  { slug: 'mengenal-aplikasi-ewallet-terpopuler-di-indonesia', lastmod: '2024-01-11' },
];

// Article pages
const articlePages = articles.map(article => ({
  loc: `/artikel/${article.slug}/`,
  changefreq: 'monthly',
  priority: 0.7,
  lastmod: article.lastmod,
}));

// Combine all pages
const allPages = [
  ...staticPages,
  ...forumCategoryPages,
  ...forumThreadPages,
  ...articlePages,
];

// Generate XML
function generateSitemapXml(pages) {
  const urls = pages.map(page => `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}

// Write to file
const xmlContent = generateSitemapXml(allPages);
fs.writeFileSync(OUTPUT_FILE, xmlContent);

console.log(`✅ Sitemap generated successfully at ${OUTPUT_FILE}`);
console.log(`📊 Total URLs: ${allPages.length}`);
console.log(`🌐 Base URL: ${BASE_URL}`);
