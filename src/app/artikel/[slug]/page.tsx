import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, User, Eye, Share2, Facebook, Twitter, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock articles data
const articles: Record<string, any> = {
  'ojk-luncurkan-roadmap-pengembangan-fintech-2024-2029': {
    id: 1,
    title: "OJK Luncurkan Roadmap Pengembangan Fintech 2024-2029",
    content: `<p>Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.</p>
<p>Roadmap ini mencakup berbagai aspek pengembangan fintech di Indonesia, termasuk:</p>
<ul>
<li>Peningkatan literasi keuangan digital</li>
<li>Penguatan perlindungan konsumen</li>
<li>Inovasi produk dan layanan fintech</li>
<li>Integrasi dengan sistem keuangan tradisional</li>
</ul>
<p>Dengan roadmap ini, OJK berharap dapat menciptakan ekosistem fintech yang sehat, inklusif, dan berkelanjutan di Indonesia.</p>`,
    excerpt: "Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.",
    author: "Tim Redaksi",
    publishDate: "2024-01-15",
    category: "OJK",
    tags: ["OJK", "Fintech", "Regulasi", "Roadmap"],
    readTime: 5,
    views: 1250,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    slug: "ojk-luncurkan-roadmap-pengembangan-fintech-2024-2029",
  },
  'tren-investasi-cryptocurrency-di-indonesia-2024': {
    id: 2,
    title: "Tren Investasi Cryptocurrency di Indonesia Tahun 2024",
    content: `<p>Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.</p>
<p>Beberapa tren utama yang diamati:</p>
<ul>
<li>Peningkatan adopsi Bitcoin sebagai aset investasi</li>
<li>Regulasi yang lebih jelas dari Bappebti</li>
<li>Munculnya platform exchange lokal yang terpercaya</li>
<li>Minat generasi muda terhadap crypto</li>
</ul>`,
    excerpt: "Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.",
    author: "Crypto Analyst",
    publishDate: "2024-01-14",
    category: "Investasi",
    tags: ["Cryptocurrency", "Bitcoin", "Investasi", "Digital Asset"],
    readTime: 8,
    views: 2100,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    slug: "tren-investasi-cryptocurrency-di-indonesia-2024",
  },
  'perbandingan-bunga-deposito-bank-digital-vs-konvensional': {
    id: 3,
    title: "Perbandingan Bunga Deposito Bank Digital vs Bank Konvensional",
    content: `<p>Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.</p>
<p>Dalam era digital banking, persaingan suku bunga deposito semakin ketat. Bank digital yang tidak memiliki biaya operasional fisik dapat menawarkan bunga yang lebih tinggi.</p>`,
    excerpt: "Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.",
    author: "Banking Expert",
    publishDate: "2024-01-13",
    category: "Perbankan",
    tags: ["Deposito", "Bank Digital", "Suku Bunga", "Investasi"],
    readTime: 6,
    views: 890,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    slug: "perbandingan-bunga-deposito-bank-digital-vs-konvensional",
  },
  'cara-memilih-asuransi-jiwa-untuk-keluarga-muda': {
    id: 4,
    title: "Cara Memilih Asuransi Jiwa yang Tepat untuk Keluarga Muda",
    content: `<p>Panduan lengkap memilih asuransi jiwa untuk keluarga muda, mulai dari jenis produk hingga tips memilih perusahaan asuransi terpercaya.</p>
<p>Asuransi jiwa merupakan salah satu produk keuangan yang penting untuk keluarga muda. Berikut adalah panduan lengkap:</p>
<ol>
<li>Tentukan kebutuhan perlindungan</li>
<li>Pilih jenis asuransi yang tepat</li>
<li>Bandinkan premi dari berbagai perusahaan</li>
<li>Periksa reputasi perusahaan asuransi</li>
<li>Baca syarat dan ketentuan dengan teliti</li>
</ol>`,
    excerpt: "Panduan lengkap memilih asuransi jiwa untuk keluarga muda, mulai dari jenis produk hingga tips memilih perusahaan asuransi terpercaya.",
    author: "Insurance Advisor",
    publishDate: "2024-01-12",
    category: "Asuransi",
    tags: ["Asuransi Jiwa", "Keluarga", "Proteksi", "Financial Planning"],
    readTime: 7,
    views: 650,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
    slug: "cara-memilih-asuransi-jiwa-untuk-keluarga-muda",
  },
  'mengenal-aplikasi-ewallet-terpopuler-di-indonesia': {
    id: 5,
    title: "Mengenal Lebih Dekat Aplikasi E-Wallet Terpopuler di Indonesia",
    content: `<p>Review mendalam tentang fitur, keamanan, dan keunggulan dari aplikasi e-wallet terpopuler di Indonesia seperti GoPay, OVO, DANA, dan ShopeePay.</p>
<p>E-wallet telah menjadi bagian tak terpisahkan dari kehidupan digital masyarakat Indonesia. Setiap platform memiliki keunggulan tersendiri.</p>`,
    excerpt: "Review mendalam tentang fitur, keamanan, dan keunggulan dari aplikasi e-wallet terpopuler di Indonesia seperti GoPay, OVO, DANA, dan ShopeePay.",
    author: "Fintech Reviewer",
    publishDate: "2024-01-11",
    category: "Fintech",
    tags: ["E-Wallet", "Digital Payment", "GoPay", "OVO", "DANA"],
    readTime: 9,
    views: 1820,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    slug: "mengenal-aplikasi-ewallet-terpopuler-di-indonesia",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles[params.slug];
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel yang Anda cari tidak ditemukan.',
    };
  }

  return {
    title: `${article.title} | Call Center Finance Indonesia`,
    description: article.excerpt,
    keywords: [...article.tags, 'artikel keuangan', 'berita fintech', 'investasi'],
    alternates: { canonical: `https://www.call-center.id/artikel/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.call-center.id/artikel/${article.slug}/`,
      images: [
        {
          url: article.image,
          width: 800,
          height: 400,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

// Breadcrumb Schema
function generateBreadcrumbSchema(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.call-center.id/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Artikel",
        "item": "https://www.call-center.id/artikel/",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://www.call-center.id/artikel/${article.slug}/`,
      },
    ],
  };
}

// Article Schema
function generateArticleSchema(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "articleBody": article.content.replace(/<[^>]*>/g, ''),
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    "publisher": {
      "@type": "Organization",
      "name": "Call Center Finance Indonesia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn-ai.onspace.ai/onspace/project/image/2hGG6P7tn8CTHN87f9mtSp/call-center.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.call-center.id/artikel/${article.slug}/`,
    },
  };
}

// WebPage Schema
function generateWebPageSchema(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": article.title,
    "url": `https://www.call-center.id/artikel/${article.slug}/`,
    "description": article.excerpt,
    "publisher": {
      "@type": "Organization",
      "name": "Call Center Finance Indonesia",
    },
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    return notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema(article);
  const articleSchema = generateArticleSchema(article);
  const webpageSchema = generateWebPageSchema(article);

  const shareUrl = `https://www.call-center.id/artikel/${article.slug}/`;
  const shareText = encodeURIComponent(article.title);
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Back to Articles */}
          <Link href="/artikel/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Artikel
          </Link>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className="mb-3 bg-finance-gold text-finance-navy">
                {article.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

              {/* Article Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.publishDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{article.readTime} min baca</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full max-h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-sm text-muted-foreground mr-4">Bagikan:</span>
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="Share ke WhatsApp">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" title="Share ke Facebook">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Facebook className="h-4 w-4" />
                  </Button>
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" title="Share ke Twitter">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </a>
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share Buttons (Bottom) */}
              <div className="flex items-center gap-2 mt-12 pt-8 border-t">
                <span className="text-sm text-muted-foreground mr-4">Bagikan artikel ini:</span>
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="Share ke WhatsApp">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" title="Share ke Facebook">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Facebook className="h-4 w-4" />
                  </Button>
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" title="Share ke Twitter">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(articles)
                  .filter((a: any) => a.slug !== article.slug)
                  .slice(0, 3)
                  .map((related: any) => (
                    <Card key={related.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader>
                        <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                        <CardTitle className="text-lg line-clamp-2">
                          <Link href={`/artikel/${related.slug}/`} className="hover:text-primary transition-colors">
                            {related.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {related.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{related.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>{related.views}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <Card className="mt-16 bg-finance-navy text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Newsletter Keuangan</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Dapatkan update terbaru seputar dunia keuangan Indonesia langsung di inbox Anda.
                  Berlangganan newsletter mingguan kami sekarang juga!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Email Anda"
                    className="flex-1 bg-white text-black"
                  />
                  <Button className="bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                    Berlangganan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Import Input for Newsletter
import { Input } from '@/components/ui/input';
