import { Metadata } from 'next';
import { Calendar, User, Eye, BookOpen, Balance } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'OJK & Regulasi Keuangan | Call Center Finance Indonesia',
  description: 'Informasi terbaru seputar regulasi, kebijakan, dan update dari Otoritas Jasa Keuangan (OJK). Tetap update dengan perkembangan industri keuangan Indonesia.',
  keywords: ['OJK', 'regulasi keuangan', 'kebijakan fintech', 'peraturan perbankan', 'asuransi regulasi', 'investasi aturan'],
  canonical: 'https://www.call-center.id/ojk-regulasi/',
  openGraph: {
    title: 'OJK & Regulasi Keuangan | Call Center Finance Indonesia',
    description: 'Informasi terbaru seputar regulasi dan kebijakan keuangan',
    url: 'https://www.call-center.id/ojk-regulasi/',
  },
};

// Mock OJK regulations data
const regulations = [
  {
    id: 1,
    title: "Peraturan OJK Nomor 10/POJK.05/2022 tentang Fintech Lending",
    excerpt: "Peraturan terbaru yang mengatur kegiatan peer-to-peer lending di Indonesia dengan fokus pada perlindungan konsumen.",
    content: "Peraturan ini mencakup persyaratan modal, batasan pinjaman, dan mekanisme penyelesaian sengketa.",
    publishDate: "2022-03-15",
    category: "Fintech",
    tags: ["OJK", "Fintech", "P2P Lending", "Perlindungan Konsumen"],
    readTime: 8,
    views: 2500,
    slug: "peraturan-ojk-nomor-10-pojk-05-2022-tentang-fintech-lending",
  },
  {
    id: 2,
    title: "Roadmap Pengembangan Fintech Indonesia 2024-2029",
    excerpt: "OJK meluncurkan roadmap strategis untuk pengembangan ekosistem fintech nasional selama 5 tahun ke depan.",
    content: "Roadmap ini mencakup inovasi, inklusi keuangan, perlindungan konsumen, dan integrasi sistem.",
    publishDate: "2024-01-15",
    category: "Roadmap",
    tags: ["OJK", "Fintech", "Roadmap", "Inovasi"],
    readTime: 10,
    views: 3200,
    slug: "roadmap-pengembangan-fintech-indonesia-2024-2029",
  },
  {
    id: 3,
    title: "Kebijakan Baru untuk Bank Digital di Indonesia",
    excerpt: "OJK memperbarui kebijakan untuk bank digital dengan fokus pada keamanan dan stabilitas sistem.",
    content: "Kebijakan ini mencakup persyaratan modal minimum, tata kelola, dan manajemen risiko.",
    publishDate: "2023-11-20",
    category: "Perbankan",
    tags: ["OJK", "Bank Digital", "Kebijakan", "Keamanan"],
    readTime: 6,
    views: 1800,
    slug: "kebijakan-baru-untuk-bank-digital-di-indonesia",
  },
  {
    id: 4,
    title: "Pedoman Perlindungan Konsumen Jasa Keuangan",
    excerpt: "Panduan lengkap tentang hak dan kewajiban konsumen dalam menggunakan layanan jasa keuangan.",
    content: "Pedoman ini bertujuan untuk meningkatkan kesadaran konsumen dan mencegah praktik tidak sehat.",
    publishDate: "2023-09-01",
    category: "Perlindungan Konsumen",
    tags: ["OJK", "Perlindungan", "Konsumen", "Hak"],
    readTime: 5,
    views: 1500,
    slug: "pedoman-perlindungan-konsumen-jasa-keuangan",
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
      "name": "OJK & Regulasi",
      "item": "https://www.call-center.id/ojk-regulasi/",
    },
  ],
};

// WebPage Schema
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "OJK & Regulasi Keuangan",
  "url": "https://www.call-center.id/ojk-regulasi/",
  "description": "Informasi terbaru seputar regulasi dan kebijakan keuangan dari OJK",
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
      "name": "Apa peran OJK dalam industri keuangan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OJK (Otoritas Jasa Keuangan) adalah lembaga negara yang bertugas mengawasi dan mengatur sektor jasa keuangan di Indonesia, termasuk perbankan, asuransi, pasar modal, dan fintech.",
      },
    },
    {
      "@type": "Question",
      "name": "Bagaimana cara melaporkan praktik ilegal ke OJK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anda dapat melaporkan melalui kanal pengaduan resmi OJK di website atau aplikasi OJK, atau menghubungi call center OJK di nomor 1500-655.",
      },
    },
  ],
};

export default function OjkRegulasiPage() {
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
              <Balance className="h-10 w-10 text-finance-gold" />
              <h1 className="text-4xl font-bold">OJK & Regulasi Keuangan</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Informasi terbaru seputar regulasi, kebijakan, dan update dari Otoritas Jasa Keuangan (OJK).
              Tetap update dengan perkembangan industri keuangan Indonesia.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Fintech
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Perbankan
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Asuransi
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Pasar Modal
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Perlindungan Konsumen
            </Badge>
          </div>

          {/* Regulations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {regulations.map((regulation) => (
              <Card key={regulation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="mb-2">{regulation.category}</Badge>
                  <CardTitle className="text-lg line-clamp-2">
                    <Link href={`/ojk-regulasi/${regulation.slug}/`} className="hover:text-primary transition-colors">
                      {regulation.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {regulation.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(regulation.publishDate).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{regulation.readTime} min baca</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{regulation.views}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {regulation.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Balance className="h-6 w-6 text-finance-gold" />
                  Link Penting OJK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="https://www.ojk.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      Website Resmi OJK
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://konsumen.ojk.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      Portal Konsumen OJK
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://sikapiu.ojk.go.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      SIKAPIU (Sistem Informasi Keuangan dan Asuransi)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="tel:1500655"
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      Call Center OJK: 1500-655
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-finance-gold" />
                  Regulasi Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/ojk-regulasi/roadmap-pengembangan-fintech-indonesia-2024-2029/"
                      className="text-primary hover:underline"
                    >
                      Roadmap Fintech 2024-2029
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ojk-regulasi/peraturan-ojk-nomor-10-pojk-05-2022-tentang-fintech-lending/"
                      className="text-primary hover:underline"
                    >
                      POJK Fintech Lending
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ojk-regulasi/kebijakan-baru-untuk-bank-digital-di-indonesia/"
                      className="text-primary hover:underline"
                    >
                      Kebijakan Bank Digital
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ojk-regulasi/pedoman-perlindungan-konsumen-jasa-keuangan/"
                      className="text-primary hover:underline"
                    >
                      Pedoman Perlindungan Konsumen
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Newsletter Subscription */}
          <Card className="bg-finance-navy text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Newsletter Regulasi</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Dapatkan update terbaru seputar regulasi dan kebijakan keuangan dari OJK langsung di inbox Anda.
                Berlangganan newsletter regulasi kami sekarang juga!
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
