import { Metadata } from 'next';
import { GraduationCap, BookOpen, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Edukasi Keuangan | Call Center Finance Indonesia',
  description: 'Panduan dan pendidikan seputar keuangan untuk membantu Anda memahami dunia finansial dengan lebih baik. Dari dasar hingga tingkat lanjut.',
  keywords: ['edukasi keuangan', 'panduan investasi', 'belajar fintech', 'literasi keuangan', 'manajemen keuangan'],
  canonical: 'https://www.call-center.id/edukasi-keuangan/',
  openGraph: {
    title: 'Edukasi Keuangan | Call Center Finance Indonesia',
    description: 'Panduan dan pendidikan seputar keuangan untuk membantu Anda memahami dunia finansial',
    url: 'https://www.call-center.id/edukasi-keuangan/',
  },
};

// Mock education categories
const educationCategories = [
  {
    id: 1,
    title: "Dasar-Dasar Keuangan",
    description: "Pemahaman fundamental tentang konsep keuangan, anggaran, dan perencanaan keuangan pribadi.",
    icon: "📚",
    articles: 15,
    slug: "dasar-dasar-keuangan",
  },
  {
    id: 2,
    title: "Investasi untuk Pemula",
    description: "Panduan lengkap bagi pemula yang ingin memulai investasi dengan modal terbatas.",
    icon: "📈",
    articles: 20,
    slug: "investasi-untuk-pemula",
  },
  {
    id: 3,
    title: "Manajemen Risiko",
    description: "Strategi dan teknik untuk mengelola risiko dalam investasi dan keuangan pribadi.",
    icon: "🛡️",
    articles: 12,
    slug: "manajemen-risiko",
  },
  {
    id: 4,
    title: "Fintech & Digital Banking",
    description: "Panduan menggunakan layanan fintech dan digital banking dengan aman dan efektif.",
    icon: "📱",
    articles: 18,
    slug: "fintech-digital-banking",
  },
  {
    id: 5,
    title: "Perencanaan Pensiun",
    description: "Strategi perencanaan keuangan untuk masa pensiun yang nyaman dan sejahtera.",
    icon: "👵",
    articles: 8,
    slug: "perencanaan-pensiun",
  },
  {
    id: 6,
    title: "Asuransi & Proteksi",
    description: "Pemahaman tentang berbagai jenis asuransi dan perlindungan keuangan.",
    icon: "🏥",
    articles: 10,
    slug: "asuransi-proteksi",
  },
];

// Mock featured articles
const featuredArticles = [
  {
    id: 1,
    title: "Panduan Lengkap: Cara Memulai Investasi Saham untuk Pemula",
    excerpt: "Langkah demi langkah memulai investasi saham dengan modal terbatas dan risiko terkendali.",
    slug: "panduan-memulai-investasi-saham-untuk-pemula",
    category: "Investasi",
    readTime: 10,
    views: 5200,
  },
  {
    id: 2,
    title: "Mengenal Lebih Dekat Tentang Reksadana: Jenis dan Keuntungannya",
    excerpt: "Panduan lengkap tentang reksadana, jenis-jenisnya, dan bagaimana memilih yang tepat untuk Anda.",
    slug: "mengenal-reksadana-jenis-dan-keuntungannya",
    category: "Investasi",
    readTime: 8,
    views: 3800,
  },
  {
    id: 3,
    title: "Strategi Manajemen Keuangan untuk Karyawan dengan Gaji UMR",
    excerpt: "Tips dan strategi mengelola keuangan dengan gaji UMR agar tetap bisa menabung dan berinvestasi.",
    slug: "strategi-manajemen-keuangan-untuk-gaji-umr",
    category: "Manajemen Keuangan",
    readTime: 12,
    views: 4500,
  },
];

// Breadcrumb Schema
const breadcrumbSchema = {
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
      "name": "Edukasi Keuangan",
      "item": "https://www.call-center.id/edukasi-keuangan/",
    },
  ],
};

// WebPage Schema
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Edukasi Keuangan",
  "url": "https://www.call-center.id/edukasi-keuangan/",
  "description": "Panduan dan pendidikan seputar keuangan untuk membantu Anda memahami dunia finansial",
  "publisher": {
    "@type": "Organization",
    "name": "Call Center Finance Indonesia",
  },
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah edukasi keuangan ini gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, semua materi edukasi keuangan di website kami sepenuhnya gratis untuk diakses oleh semua orang.",
      },
    },
    {
      "@type": "Question",
      "name": "Untuk siapa edukasi keuangan ini?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Edukasi keuangan kami dirancang untuk semua kalangan, dari pemula hingga yang sudah berpengalaman, dari karyawan hingga pengusaha.",
      },
    },
  ],
};

export default function EdukasiKeuanganPage() {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-10 w-10 text-finance-gold" />
              <h1 className="text-4xl font-bold">Edukasi Keuangan</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Panduan dan pendidikan seputar keuangan untuk membantu Anda memahami dunia finansial dengan lebih baik.
              Dari dasar hingga tingkat lanjut.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-finance-navy" />
                <h3 className="text-2xl font-bold text-finance-navy">50+</h3>
                <p className="text-sm text-muted-foreground">Modul Pendidikan</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-finance-navy" />
                <h3 className="text-2xl font-bold text-finance-navy">200+</h3>
                <p className="text-sm text-muted-foreground">Artikel Edukasi</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-finance-navy" />
                <h3 className="text-2xl font-bold text-finance-navy">10K+</h3>
                <p className="text-sm text-muted-foreground">Pembaca Aktif</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-finance-navy" />
                <h3 className="text-2xl font-bold text-finance-navy">95%</h3>
                <p className="text-sm text-muted-foreground">Kepuasan</p>
              </CardContent>
            </Card>
          </div>

          {/* Featured Articles */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Artikel Edukasi Populer</h2>
              <Link href="/artikel/" className="text-primary hover:underline">
                Lihat Semua Artikel
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                    <CardTitle className="text-lg line-clamp-2">
                      <Link href={`/artikel/${article.slug}/`} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{article.readTime} min baca</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{article.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Kategori Edukasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.articles} artikel
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <Link
                      href={`/edukasi-keuangan/${category.slug}/`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Pelajari Selengkapnya →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Jalur Belajar</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pemula</CardTitle>
                  <CardDescription>
                    Dasar-dasar keuangan untuk pemula
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">8 modul • 2 jam</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">Anggaran</Badge>
                        <Badge variant="outline">Tabungan</Badge>
                        <Badge variant="outline">Utang</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Mulai Belajar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Menengah</CardTitle>
                  <CardDescription>
                    Investasi dan perencanaan keuangan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">10 modul • 4 jam</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">Saham</Badge>
                        <Badge variant="outline">Reksadana</Badge>
                        <Badge variant="outline">Asuransi</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Mulai Belajar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lanjutan</CardTitle>
                  <CardDescription>
                    Strategi keuangan tingkat lanjut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">6 modul • 3 jam</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">Portofolio</Badge>
                        <Badge variant="outline">Pensiun</Badge>
                        <Badge variant="outline">Pajak</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Mulai Belajar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <Card className="bg-finance-navy text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Newsletter Edukasi</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Dapatkan materi edukasi keuangan terbaru langsung di inbox Anda.
                Berlangganan newsletter edukasi kami sekarang juga!
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Import Input for Newsletter
import { Input } from '@/components/ui/input';
