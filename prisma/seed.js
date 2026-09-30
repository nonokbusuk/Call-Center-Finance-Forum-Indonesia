const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const categories = [
  { name: 'Pinjaman Online', slug: 'pinjaman-online', icon: 'CreditCard', order: 1 },
  { name: 'Perbankan', slug: 'perbankan', icon: 'Landmark', order: 2 },
  { name: 'Investasi', slug: 'investasi', icon: 'TrendingUp', order: 3 },
  { name: 'Asuransi', slug: 'asuransi', icon: 'Shield', order: 4 },
  { name: 'Fintech', slug: 'fintech', icon: 'Smartphone', order: 5 },
  { name: 'OJK & Regulasi', slug: 'ojk-regulasi', icon: 'Scale', order: 6 },
];

const threads = [
  {
    title: 'Bagaimana cara keluar dari jeratan pinjol ilegal?',
    slug: 'bagaimana-cara-keluar-dari-jeratan-pinjol-ilegal',
    content: 'Saya terjebak dengan beberapa pinjaman online ilegal dan sekarang ditagih dengan cara yang tidak wajar...',
    author: 'Anonymous123',
    category: 'Pinjaman Online',
    views: 456,
    upvotes: 15,
    downvotes: 2,
    isPinned: true,
    daysAgo: 0,
    replies: [
      { author: 'FinancialAdvisor', content: 'Langkah pertama: jangan panik dan jangan bayar tagihan di luar ketentuan. Laporkan ke OJK via 157.', hoursAgo: 1.5 },
      { author: 'LegalExpert', content: 'Dokumentasikan semua bukti penagihan (screenshot, rekaman). Itu penting untuk laporan ke Satgas Pemberantasan Pinjol Ilegal.', hoursAgo: 3 },
    ],
  },
  {
    title: 'Review Bank Digital Jenius vs Bank Jago - Mana yang lebih baik?',
    slug: 'review-bank-digital-jenius-vs-bank-jago',
    content: 'Mau pindah ke bank digital, bingung pilih antara Jenius dan Bank Jago. Ada yang punya pengalaman?',
    author: 'DigitalBanker',
    category: 'Perbankan',
    views: 892,
    upvotes: 24,
    downvotes: 1,
    isPinned: false,
    daysAgo: 0,
    replies: [
      { author: 'BankExpert', content: 'Dari sisi fitur investasi, Bank Jago lebih lengkap dengan Jago Investasi (reksadana). Jenius unggul di budgeting Maxpoin.', hoursAgo: 1 },
    ],
  },
  {
    title: 'Tips investasi saham untuk gaji UMR',
    slug: 'tips-investasi-saham-untuk-gaji-umr',
    content: 'Dengan gaji UMR, apakah masih bisa investasi saham? Berapa minimal yang harus dialokasikan?',
    author: 'NewInvestor',
    category: 'Investasi',
    views: 1250,
    upvotes: 42,
    downvotes: 3,
    isPinned: false,
    daysAgo: 0,
    replies: [
      { author: 'StockGuru', content: 'Bisa banget. Mulai dari 10% gaji per bulan saja, konsisten lebih penting daripada nominal besar.', hoursAgo: 2 },
    ],
  },
  {
    title: 'Asuransi kesehatan swasta vs BPJS - Perbandingan lengkap',
    slug: 'asuransi-kesehatan-swasta-vs-bpjs-perbandingan-lengkap',
    content: 'Setelah riset panjang, ini perbandingan detail antara asuransi kesehatan swasta dan BPJS...',
    author: 'HealthInsurer',
    category: 'Asuransi',
    views: 678,
    upvotes: 28,
    downvotes: 0,
    isPinned: false,
    daysAgo: 0,
    replies: [
      { author: 'MedicalExpert', content: 'Idealnya kombinasi: BPJS sebagai dasar, tambahan asuransi swasta untuk kelas rawat inap lebih baik.', hoursAgo: 5 },
    ],
  },
  {
    title: 'Update regulasi OJK terbaru untuk P2P Lending',
    slug: 'update-regulasi-ojk-terbaru-untuk-p2p-lending',
    content: 'OJK baru saja mengeluarkan regulasi baru untuk platform P2P lending. Apa dampaknya bagi investor?',
    author: 'RegulationWatcher',
    category: 'OJK & Regulasi',
    views: 234,
    upvotes: 12,
    downvotes: 1,
    isPinned: false,
    daysAgo: 1,
    replies: [
      { author: 'LegalExpert', content: 'Dampaknya: minimum modal platform naik dan batas dana tersalur per peminjam diatur lebih ketat.', hoursAgo: 19 },
    ],
  },
];

const articles = [
  {
    title: 'OJK Luncurkan Roadmap Pengembangan Fintech 2024-2029',
    slug: 'ojk-luncurkan-roadmap-pengembangan-fintech-2024-2029',
    excerpt: 'Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.',
    content: `<p>Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.</p><p>Roadmap ini mencakup berbagai aspek pengembangan fintech di Indonesia, termasuk:</p><ul><li>Peningkatan literasi keuangan digital</li><li>Penguatan perlindungan konsumen</li><li>Inovasi produk dan layanan fintech</li><li>Integrasi dengan sistem keuangan tradisional</li></ul><p>Dengan roadmap ini, OJK berharap dapat menciptakan ekosistem fintech yang sehat, inklusif, dan berkelanjutan di Indonesia.</p>`,
    author: 'Tim Redaksi',
    category: 'OJK',
    tags: 'OJK, Fintech, Regulasi, Roadmap',
    readTime: 5,
    views: 1250,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    publishDate: '2024-01-15',
  },
  {
    title: 'Tren Investasi Cryptocurrency di Indonesia Tahun 2024',
    slug: 'tren-investasi-cryptocurrency-di-indonesia-2024',
    excerpt: 'Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.',
    content: `<p>Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.</p><p>Beberapa tren utama yang diamati:</p><ul><li>Peningkatan adopsi Bitcoin sebagai aset investasi</li><li>Regulasi yang lebih jelas dari Bappebti</li><li>Munculnya platform exchange lokal yang terpercaya</li><li>Minat generasi muda terhadap crypto</li></ul>`,
    author: 'Crypto Analyst',
    category: 'Investasi',
    tags: 'Cryptocurrency, Bitcoin, Investasi, Digital Asset',
    readTime: 8,
    views: 2100,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    publishDate: '2024-01-14',
  },
  {
    title: 'Perbandingan Bunga Deposito Bank Digital vs Bank Konvensional',
    slug: 'perbandingan-bunga-deposito-bank-digital-vs-konvensional',
    excerpt: 'Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.',
    content: `<p>Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.</p><p>Dalam era digital banking, persaingan suku bunga deposito semakin ketat. Bank digital yang tidak memiliki biaya operasional fisik dapat menawarkan bunga yang lebih tinggi.</p>`,
    author: 'Banking Expert',
    category: 'Perbankan',
    tags: 'Deposito, Bank Digital, Suku Bunga, Investasi',
    readTime: 6,
    views: 890,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    publishDate: '2024-01-13',
  },
  {
    title: 'Cara Memilih Asuransi Jiwa yang Tepat untuk Keluarga Muda',
    slug: 'cara-memilih-asuransi-jiwa-untuk-keluarga-muda',
    excerpt: 'Panduan lengkap memilih asuransi jiwa untuk keluarga muda, mulai dari jenis produk hingga tips memilih perusahaan asuransi terpercaya.',
    content: `<p>Panduan lengkap memilih asuransi jiwa untuk keluarga muda, mulai dari jenis produk hingga tips memilih perusahaan asuransi terpercaya.</p><p>Asuransi jiwa merupakan salah satu produk keuangan yang penting untuk keluarga muda. Berikut adalah panduan lengkap:</p><ol><li>Tentukan kebutuhan perlindungan</li><li>Pilih jenis asuransi yang tepat</li><li>Bandingkan premi dari berbagai perusahaan</li><li>Periksa reputasi perusahaan asuransi</li><li>Baca syarat dan ketentuan dengan teliti</li></ol>`,
    author: 'Insurance Advisor',
    category: 'Asuransi',
    tags: 'Asuransi Jiwa, Keluarga, Proteksi, Financial Planning',
    readTime: 7,
    views: 650,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop',
    publishDate: '2024-01-12',
  },
  {
    title: 'Mengenal Lebih Dekat Aplikasi E-Wallet Terpopuler di Indonesia',
    slug: 'mengenal-aplikasi-ewallet-terpopuler-di-indonesia',
    excerpt: 'Review mendalam tentang fitur, keamanan, dan keunggulan dari aplikasi e-wallet terpopuler di Indonesia seperti GoPay, OVO, DANA, dan ShopeePay.',
    content: `<p>Review mendalam tentang fitur, keamanan, dan keunggulan dari aplikasi e-wallet terpopuler di Indonesia seperti GoPay, OVO, DANA, dan ShopeePay.</p><p>E-wallet telah menjadi bagian tak terpisahkan dari kehidupan digital masyarakat Indonesia. Setiap platform memiliki keunggulan tersendiri.</p>`,
    author: 'Fintech Reviewer',
    category: 'Fintech',
    tags: 'E-Wallet, Digital Payment, GoPay, OVO, DANA',
    readTime: 9,
    views: 1820,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    publishDate: '2024-01-11',
  },
];

async function main() {
  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    console.log('Database already seeded, skipping.');
    return;
  }

  const passwordHash = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD || 'Admin123!', 10);
  await prisma.adminUser.create({
    data: {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: passwordHash,
      name: 'Administrator',
    },
  });
  console.log('Admin user created: admin');

  for (const c of categories) {
    await prisma.forumCategory.create({ data: c });
  }
  console.log(`Created ${categories.length} forum categories`);

  for (const t of threads) {
    const category = await prisma.forumCategory.findUnique({ where: { name: t.category } });
    const createdAt = new Date(Date.now() - t.daysAgo * 86400000 - 2 * 3600000);
    await prisma.forumThread.create({
      data: {
        title: t.title,
        slug: t.slug,
        content: t.content,
        author: t.author,
        views: t.views,
        upvotes: t.upvotes,
        downvotes: t.downvotes,
        isPinned: t.isPinned,
        createdAt,
        categoryId: category.id,
        replies: {
          create: t.replies.map((r) => ({
            author: r.author,
            content: r.content,
            createdAt: new Date(createdAt.getTime() + (24 - r.hoursAgo) * 3600000 - 86400000),
          })),
        },
      },
    });
  }
  console.log(`Created ${threads.length} forum threads`);

  for (const a of articles) {
    await prisma.article.create({
      data: {
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: a.content,
        author: a.author,
        category: a.category,
        tags: a.tags,
        readTime: a.readTime,
        views: a.views,
        image: a.image,
        publishDate: new Date(a.publishDate),
      },
    });
  }
  console.log(`Created ${articles.length} articles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
