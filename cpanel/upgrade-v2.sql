-- ===== UPGRADE v2: struktur situs, direktori perusahaan, keyword trend =====
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
