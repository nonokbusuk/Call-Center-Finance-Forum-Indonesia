-- Database schema + seed data untuk Call Center Finance Indonesia (cPanel/MySQL)
-- Jalankan lewat phpMyAdmin > Import

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL DEFAULT 'Administrator',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content MEDIUMTEXT,
  author VARCHAR(100) DEFAULT 'Tim Redaksi',
  category VARCHAR(100) DEFAULT 'Fintech',
  tags VARCHAR(500) DEFAULT '',
  read_time INT DEFAULT 5,
  views INT DEFAULT 0,
  image VARCHAR(500),
  published TINYINT(1) DEFAULT 1,
  publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS forum_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50) DEFAULT NULL,
  sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS forum_threads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT,
  author VARCHAR(100) DEFAULT 'Admin',
  views INT DEFAULT 0,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  is_pinned TINYINT(1) DEFAULT 0,
  is_locked TINYINT(1) DEFAULT 0,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS forum_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  thread_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200) DEFAULT 'Umum',
  message TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===== SEED DATA =====
-- Password default: Admin123! (hash bcrypt). Ganti setelah login pertama!

INSERT INTO admin_users (username, password, name) VALUES
('admin', '$2y$12$thTTCnFlzBVTzHLf0yt8reK6uhpDT2D0hNX.mf/pQe1z6njG3GhIW', 'Administrator');

INSERT INTO forum_categories (name, slug, icon, sort_order) VALUES
('Pinjaman Online', 'pinjaman-online', 'credit-card', 1),
('Perbankan', 'perbankan', 'landmark', 2),
('Investasi', 'investasi', 'trending-up', 3),
('Asuransi', 'asuransi', 'shield', 4),
('Fintech', 'fintech', 'smartphone', 5),
('OJK & Regulasi', 'ojk-regulasi', 'scale', 6);

INSERT INTO forum_threads (title, slug, content, author, views, upvotes, downvotes, is_pinned, category_id, created_at) VALUES
('Bagaimana cara keluar dari jeratan pinjol ilegal?', 'bagaimana-cara-keluar-dari-jeratan-pinjol-ilegal', 'Saya terjebak dengan beberapa pinjaman online ilegal dan sekarang ditagih dengan cara yang tidak wajar...', 'Anonymous123', 456, 15, 2, 1, 1, NOW() - INTERVAL 2 HOUR),
('Review Bank Digital Jenius vs Bank Jago - Mana yang lebih baik?', 'review-bank-digital-jenius-vs-bank-jago', 'Mau pindah ke bank digital, bingung pilih antara Jenius dan Bank Jago. Ada yang punya pengalaman?', 'DigitalBanker', 892, 24, 1, 0, 2, NOW() - INTERVAL 4 HOUR),
('Tips investasi saham untuk gaji UMR', 'tips-investasi-saham-untuk-gaji-umr', 'Dengan gaji UMR, apakah masih bisa investasi saham? Berapa minimal yang harus dialokasikan?', 'NewInvestor', 1250, 42, 3, 0, 3, NOW() - INTERVAL 6 HOUR),
('Asuransi kesehatan swasta vs BPJS - Perbandingan lengkap', 'asuransi-kesehatan-swasta-vs-bpjs-perbandingan-lengkap', 'Setelah riset panjang, ini perbandingan detail antara asuransi kesehatan swasta dan BPJS...', 'HealthInsurer', 678, 28, 0, 0, 4, NOW() - INTERVAL 8 HOUR),
('Update regulasi OJK terbaru untuk P2P Lending', 'update-regulasi-ojk-terbaru-untuk-p2p-lending', 'OJK baru saja mengeluarkan regulasi baru untuk platform P2P lending. Apa dampaknya bagi investor?', 'RegulationWatcher', 234, 12, 1, 0, 6, NOW() - INTERVAL 1 DAY);

INSERT INTO forum_replies (content, author, thread_id, created_at) VALUES
('Langkah pertama: jangan panik dan jangan bayar tagihan di luar ketentuan. Laporkan ke OJK via 157.', 'FinancialAdvisor', 1, NOW() - INTERVAL 90 MINUTE),
('Dokumentasikan semua bukti penagihan (screenshot, rekaman). Itu penting untuk laporan ke Satgas Pemberantasan Pinjol Ilegal.', 'LegalExpert', 1, NOW() - INTERVAL 3 HOUR),
('Dari sisi fitur investasi, Bank Jago lebih lengkap dengan Jago Investasi (reksadana). Jenius unggul di budgeting Maxpoin.', 'BankExpert', 2, NOW() - INTERVAL 1 HOUR),
('Bisa banget. Mulai dari 10% gaji per bulan saja, konsisten lebih penting daripada nominal besar.', 'StockGuru', 3, NOW() - INTERVAL 2 HOUR),
('Idealnya kombinasi: BPJS sebagai dasar, tambahan asuransi swasta untuk kelas rawat inap lebih baik.', 'MedicalExpert', 4, NOW() - INTERVAL 5 HOUR),
('Dampaknya: minimum modal platform naik dan batas dana tersalur per peminjam diatur lebih ketat.', 'LegalExpert', 5, NOW() - INTERVAL 19 HOUR);

INSERT INTO articles (title, slug, excerpt, content, author, category, tags, read_time, views, image, publish_date) VALUES
('OJK Luncurkan Roadmap Pengembangan Fintech 2024-2029', 'ojk-luncurkan-roadmap-pengembangan-fintech-2024-2029', 'Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.', '<p>Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.</p><p>Roadmap ini mencakup berbagai aspek pengembangan fintech di Indonesia, termasuk:</p><ul><li>Peningkatan literasi keuangan digital</li><li>Penguatan perlindungan konsumen</li><li>Inovasi produk dan layanan fintech</li><li>Integrasi dengan sistem keuangan tradisional</li></ul><p>Dengan roadmap ini, OJK berharap dapat menciptakan ekosistem fintech yang sehat, inklusif, dan berkelanjutan di Indonesia.</p>', 'Tim Redaksi', 'OJK', 'OJK, Fintech, Regulasi, Roadmap', 5, 1250, 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop', '2024-01-15 09:00:00'),
('Tren Investasi Cryptocurrency di Indonesia Tahun 2024', 'tren-investasi-cryptocurrency-di-indonesia-2024', 'Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.', '<p>Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.</p><p>Beberapa tren utama yang diamati:</p><ul><li>Peningkatan adopsi Bitcoin sebagai aset investasi</li><li>Regulasi yang lebih jelas dari Bappebti</li><li>Munculnya platform exchange lokal yang terpercaya</li><li>Minat generasi muda terhadap crypto</li></ul>', 'Crypto Analyst', 'Investasi', 'Cryptocurrency, Bitcoin, Investasi, Digital Asset', 8, 2100, 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop', '2024-01-14 10:00:00'),
('Perbandingan Bunga Deposito Bank Digital vs Bank Konvensional', 'perbandingan-bunga-deposito-bank-digital-vs-konvensional', 'Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.', '<p>Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.</p><p>Dalam era digital banking, persaingan suku bunga deposito semakin ketat. Bank digital yang tidak memiliki biaya operasional fisik dapat menawarkan bunga yang lebih tinggi.</p>', 'Banking Expert', 'Perbankan', 'Deposito, Bank Digital, Suku Bunga, Investasi', 6, 890, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop', '2024-01-13 11:00:00'),
('Cara Memilih Asuransi Jiwa yang Tepat untuk Keluarga Muda', 'cara-memilih-asuransi-jiwa-untuk-keluarga-muda', 'Panduan lengkap memilih asuransi jiwa untuk keluarga muda, mulai dari jenis produk hingga tips memilih perusahaan asuransi terpercaya.', '<p>Panduan lengkap memilih asuransi jiwa untuk keluarga muda, mulai dari jenis produk hingga tips memilih perusahaan asuransi terpercaya.</p><ol><li>Tentukan kebutuhan perlindungan</li><li>Pilih jenis asuransi yang tepat</li><li>Bandingkan premi dari berbagai perusahaan</li><li>Periksa reputasi perusahaan asuransi</li><li>Baca syarat dan ketentuan dengan teliti</li></ol>', 'Insurance Advisor', 'Asuransi', 'Asuransi Jiwa, Keluarga, Proteksi, Financial Planning', 7, 650, 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop', '2024-01-12 12:00:00'),
('Mengenal Lebih Dekat Aplikasi E-Wallet Terpopuler di Indonesia', 'mengenal-aplikasi-ewallet-terpopuler-di-indonesia', 'Review mendalam tentang fitur, keamanan, dan keunggulan dari aplikasi e-wallet terpopuler di Indonesia seperti GoPay, OVO, DANA, dan ShopeePay.', '<p>Review mendalam tentang fitur, keamanan, dan keunggulan dari aplikasi e-wallet terpopuler di Indonesia seperti GoPay, OVO, DANA, dan ShopeePay.</p><p>E-wallet telah menjadi bagian tak terpisahkan dari kehidupan digital masyarakat Indonesia. Setiap platform memiliki keunggulan tersendiri.</p>', 'Fintech Reviewer', 'Fintech', 'E-Wallet, Digital Payment, GoPay, OVO, DANA', 9, 1820, 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop', '2024-01-11 13:00:00');


-- ===== v2: struktur situs, direktori perusahaan, keyword trend =====: struktur situs, direktori perusahaan, keyword trend =====
-- Jalankan di phpMyAdmin JIKA database.sql v1 sudah pernah diimport.
-- (Untuk instalasi baru: tidak perlu file ini — database.sql sudah lengkap)

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value LONGTEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content MEDIUMTEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(255) NOT NULL,
  location VARCHAR(20) DEFAULT 'header',
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS finance_companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  phone VARCHAR(50) DEFAULT '',
  whatsapp VARCHAR(50) DEFAULT '',
  email VARCHAR(150) DEFAULT '',
  website VARCHAR(255) DEFAULT '',
  address TEXT,
  description TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  is_verified TINYINT(1) DEFAULT 0,
  is_featured TINYINT(1) DEFAULT 0,
  views INT DEFAULT 0,
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS keywords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  keyword VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100) DEFAULT 'umum',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS keyword_searches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  keyword_id INT NOT NULL,
  source VARCHAR(20) DEFAULT 'public',
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pengaturan default
INSERT INTO settings (setting_key, setting_value) VALUES
('site_name', 'Call Center Finance Indonesia'),
('site_tagline', 'Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di Indonesia'),
('hero_title', 'Solusi Keuangan Indonesia Terlengkap'),
('hero_subtitle', 'Forum diskusi, artikel, dan direktori call center perusahaan finance Indonesia'),
('announcement', ''),
('contact_phone', '+62 21 1500 888'),
('contact_email', 'info@call-center.id'),
('contact_whatsapp', ''),
('contact_address', 'Jl. Sudirman No. 1, Jakarta Selatan'),
('footer_description', 'Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di Indonesia'),
('meta_description', 'Forum, artikel, dan direktori call center keuangan Indonesia — pinjaman online, investasi, perbankan, fintech, dan OJK.'),
('meta_keywords', 'call center pinjol, call center easycash, forum keuangan, pinjaman online, investasi, fintech, OJK'),
('google_analytics_id', '')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

-- Menu navigasi default
INSERT INTO menu_items (label, url, location, sort_order, is_active) VALUES
('Home', '/', 'header', 1, 1),
('Forum', '/forum/', 'header', 2, 1),
('Artikel', '/artikel/', 'header', 3, 1),
('OJK & Regulasi', '/ojk-regulasi/', 'header', 4, 1),
('Edukasi', '/edukasi-keuangan/', 'header', 5, 1),
('Direktori', '/direktori/', 'header', 6, 1),
('Kontak', '/kontak/', 'header', 7, 1);

-- Direktori perusahaan (NOMOR PLACEHOLDER — ganti dengan nomor asli via admin!)
INSERT INTO finance_companies (name, slug, category, phone, whatsapp, email, website, address, description, rating, is_verified, is_featured) VALUES
('EasyCash', 'easycash', 'Pinjaman Online', '0812-0000-0001', '0812-0000-0001', 'cs@easycash.id', 'https://www.easycash.id', 'Jakarta Selatan', 'Platform pinjaman online terdaftar OJK. Hubungi call center EasyCash untuk keluhan pinjaman, keterlambatan pembayaran, atau restrukturisasi.', 4.2, 0, 1),
('Kredit Pintar', 'kredit-pintar', 'Pinjaman Online', '0812-0000-0002', '0812-0000-0002', 'cs@kreditpintar.id', 'https://www.kreditpintar.id', 'Jakarta Selatan', 'Pinjaman online cepat terdaftar OJK. Layanan pelanggan untuk pertanyaan pinjaman dan keluhan penagihan.', 4.0, 0, 1),
('Kredivo', 'kredivo', 'Pinjaman Online', '0812-0000-0003', '', 'cs@kredivo.id', 'https://www.kredivo.id', 'Jakarta Selatan', 'Buy now pay later dan kredit digital untuk belanja online. Hubungi untuk limit, tagihan, dan keluhan.', 4.1, 0, 1),
('Akulaku', 'akulaku', 'Pinjaman Online', '0812-0000-0004', '', 'cs@akulaku.id', 'https://www.akulaku.com', 'Jakarta Pusat', 'Kredit online dan cicilan tanpa kartu kredit. Call center untuk keluhan aplikasi dan tagihan.', 3.9, 0, 0),
('Bank Jago', 'bank-jago', 'Bank Digital', '0812-0000-0005', '', 'cs@bankjago.com', 'https://www.jago.com', 'Jakarta Selatan', 'Bank digital berlisensi OJK. Hubungi untuk keluhan akun, transfer, dan fitur investasi.', 4.3, 0, 0),
('Jenius', 'jenius', 'Bank Digital', '0812-0000-0006', '', 'cs@jenius.com', 'https://www.jenius.com', 'Jakarta Pusat', 'Bank digital dari BTPN. Layanan pelanggan untuk akun, kartu, dan transaksi.', 4.2, 0, 0),
('Ajaib', 'ajaib', 'Investasi', '0812-0000-0007', '', 'cs@ajaib.co.id', 'https://ajaib.co.id', 'Jakarta Selatan', 'Aplikasi investasi saham dan reksadana. Hubungi untuk keluhan transaksi dan akun.', 4.0, 0, 0),
('Stockbit', 'stockbit', 'Investasi', '0812-0000-0008', '', 'cs@stockbit.com', 'https://stockbit.com', 'Jakarta Selatan', 'Aplikasi investasi saham, reksadana, dan crypto. Call center untuk keluhan trading.', 4.1, 0, 0);

-- Keyword awal sesuai tema
INSERT INTO keywords (keyword, category) VALUES
('call center easycash', 'pinjaman online'),
('call center pinjol', 'pinjaman online'),
('nomor telepon easycash', 'pinjaman online'),
('cara keluar dari pinjol ilegal', 'pinjaman online'),
('call center kredit pintar', 'pinjaman online'),
('call center ojk', 'regulasi'),
('cara investasi saham pemula', 'investasi'),
('reksadana untuk pemula', 'investasi'),
('call center bank jago', 'bank digital'),
('asuransi kesehatan swasta vs bpjs', 'asuransi');

-- Data pencarian contoh 14 hari terakhir (biar grafik tren langsung terlihat)
INSERT INTO keyword_searches (keyword_id, source, searched_at)
SELECT k.id, 'public', DATE_SUB(NOW(), INTERVAL d.n DAY) + INTERVAL FLOOR(RAND()*10) HOUR
FROM keywords k
CROSS JOIN (SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14) d
CROSS JOIN (SELECT 1 AS x UNION SELECT 2 UNION SELECT 3) e;
