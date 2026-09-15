-- Call Center Finance Forum - Database Setup
-- Jalankan di cPanel > phpMyAdmin > tab SQL

CREATE DATABASE IF NOT EXISTS callcenter_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE callcenter_db;

CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  author VARCHAR(100) DEFAULT 'Tim Redaksi',
  category VARCHAR(100) DEFAULT 'Umum',
  tags TEXT,
  image VARCHAR(500),
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  canonical VARCHAR(500),
  og_title VARCHAR(255),
  og_description TEXT,
  status ENUM('draft','published') DEFAULT 'published',
  views INT DEFAULT 0,
  read_time INT DEFAULT 5,
  publish_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default admin: username=admin password=admin123 (ubah setelah login pertama!)
-- Password hash untuk 'admin123' (bcrypt)
INSERT INTO admin_users (username, password_hash)
SELECT 'admin', '$2y$10$N9qo8uLOickgx2ZMRZoMy.MQDQ1qEh7Xn7h1ZQ1qEh7Xn7h1ZQ1qEh7'
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'admin');

-- Insert contoh artikel dari data yang sudah ada
INSERT INTO articles (title, slug, excerpt, content, author, category, tags, image, meta_title, meta_description, meta_keywords, canonical, status, publish_date, read_time) VALUES
('OJK Luncurkan Roadmap Pengembangan Fintech 2024-2029', 'ojk-luncurkan-roadmap-pengembangan-fintech-2024-2029', 'Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.', '<p>Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.</p><p>Roadmap ini mencakup berbagai aspek pengembangan fintech di Indonesia, termasuk:</p><ul><li>Peningkatan literasi keuangan digital</li><li>Penguatan perlindungan konsumen</li><li>Inovasi produk dan layanan fintech</li><li>Integrasi dengan sistem keuangan tradisional</li></ul><p>Dengan roadmap ini, OJK berharap dapat menciptakan ekosistem fintech yang sehat, inklusif, dan berkelanjutan di Indonesia.</p>', 'Tim Redaksi', 'OJK', 'OJK,Fintech,Regulasi,Roadmap', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop', 'OJK Luncurkan Roadmap Pengembangan Fintech 2024-2029', 'OJK meluncurkan roadmap fintech 2024-2029 untuk inovasi dan perlindungan konsumen', 'OJK, fintech, regulasi, roadmap, teknologi finansial, perlindungan konsumen', 'https://www.call-center.id/artikel/ojk-luncurkan-roadmap-pengembangan-fintech-2024-2029/', 'published', '2024-01-15', 5),
('Tren Investasi Cryptocurrency di Indonesia Tahun 2024', 'tren-investasi-cryptocurrency-di-indonesia-2024', 'Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.', '<p>Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.</p><p>Beberapa tren utama yang diamati:</p><ul><li>Peningkatan adopsi Bitcoin sebagai aset investasi</li><li>Regulasi yang lebih jelas dari Bappebti</li><li>Munculnya platform exchange lokal yang terpercaya</li><li>Minat generasi muda terhadap crypto</li></ul>', 'Crypto Analyst', 'Investasi', 'Cryptocurrency,Bitcoin,Investasi,Digital Asset', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop', 'Tren Investasi Cryptocurrency di Indonesia 2024', 'Tren investasi cryptocurrency di Indonesia 2024 dengan regulasi yang semakin jelas', 'cryptocurrency, bitcoin, investasi, digital asset, crypto indonesia', 'https://www.call-center.id/artikel/tren-investasi-cryptocurrency-di-indonesia-2024/', 'published', '2024-01-14', 8),
('Perbandingan Bunga Deposito Bank Digital vs Bank Konvensional', 'perbandingan-bunga-deposito-bank-digital-vs-konvensional', 'Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.', '<p>Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.</p><p>Dalam era digital banking, persaingan suku bunga deposito semakin ketat. Bank digital yang tidak memiliki biaya operasional fisik dapat menawarkan bunga yang lebih tinggi.</p>', 'Banking Expert', 'Perbankan', 'Deposito,Bank Digital,Suku Bunga,Investasi', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop', 'Perbandingan Bunga Deposito Bank Digital vs Konvensional', 'Perbandingan bunga deposito bank digital vs bank konvensional lengkap', 'deposito, bank digital, suku bunga, investasi, perbankan', 'https://www.call-center.id/artikel/perbandingan-bunga-deposito-bank-digital-vs-konvensional/', 'published', '2024-01-13', 6)
ON DUPLICATE KEY UPDATE title=title;
