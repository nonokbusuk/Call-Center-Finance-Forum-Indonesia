import { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageCircle,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Users,
  TrendingUp,
  ArrowRight,
  Pin,
  Eye,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Call Center Finance Forum Indonesia',
  description:
    'Forum diskusi, artikel, dan edukasi keuangan terdepan di Indonesia. Berbagi pengalaman seputar fintech, investasi, perbankan, asuransi, dan regulasi OJK.',
  keywords: [
    'forum keuangan indonesia',
    'call center finance',
    'diskusi fintech',
    'investasi',
    'perbankan',
    'asuransi',
    'OJK',
  ],
  alternates: {
    canonical: 'https://www.call-center.id/',
  },
  openGraph: {
    title: 'Call Center Finance Forum Indonesia',
    description:
      'Forum diskusi, artikel, dan edukasi keuangan terdepan di Indonesia.',
    url: 'https://www.call-center.id/',
    type: 'website',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Call Center Finance Indonesia',
  url: 'https://www.call-center.id',
  description:
    'Forum diskusi, artikel, dan edukasi keuangan terdepan di Indonesia.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.call-center.id/forum/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Call Center Finance Indonesia',
  url: 'https://www.call-center.id',
  email: 'info@call-center.id',
};

const categories = [
  {
    title: 'Pinjaman Online',
    description: 'Diskusi seputar pinjaman online legal & ilegal, serta cara menghindari pinjol bermasalah.',
    icon: '💳',
    href: '/forum/pinjaman-online/',
    count: 142,
  },
  {
    title: 'Perbankan',
    description: 'Review dan pengalaman layanan bank konvensional maupun bank digital di Indonesia.',
    icon: '🏦',
    href: '/forum/perbankan/',
    count: 98,
  },
  {
    title: 'Investasi',
    description: 'Strategi, reksa dana, saham, crypto, dan instrumen investasi lainnya.',
    icon: '📈',
    href: '/forum/investasi/',
    count: 215,
  },
  {
    title: 'Asuransi',
    description: 'Tips memilih asuransi, klaim, dan pengalaman dengan perusahaan asuransi.',
    icon: '🛡️',
    href: '/forum/asuransi/',
    count: 76,
  },
  {
    title: 'OJK & Regulasi',
    description: 'Informasi terbaru regulasi OJK dan perkembangan kebijakan sektor jasa keuangan.',
    icon: '⚖️',
    href: '/forum/ojk-regulasi/',
    count: 54,
  },
];

const hotThreads = [
  {
    title: 'Bagaimana cara keluar dari jeratan pinjol ilegal?',
    category: 'Pinjaman Online',
    replies: 23,
    views: 456,
    isPinned: true,
    slug: 'bagaimana-cara-keluar-dari-jeratan-pinjol-ilegal',
  },
  {
    title: 'Review Bank Digital Jenius vs Bank Jago - Mana yang lebih baik?',
    category: 'Perbankan',
    replies: 18,
    views: 892,
    isPinned: false,
    slug: 'review-bank-digital-jenius-vs-bank-jago',
  },
  {
    title: 'Strategi investasi reksa dana untuk pemula 2024',
    category: 'Investasi',
    replies: 31,
    views: 1240,
    isPinned: false,
    slug: 'strategi-investasi-reksa-dana-untuk-pemula-2024',
  },
];

const features = [
  {
    icon: MessageCircle,
    title: 'Forum Diskusi Aktif',
    description:
      'Komunitas profesional dan pengguna keuangan yang saling berbagi pengalaman dan solusi.',
  },
  {
    icon: BookOpen,
    title: 'Artikel & Berita',
    description:
      'Insight terbaru seputar industri finansial Indonesia, dari berita hingga analisis mendalam.',
  },
  {
    icon: ShieldCheck,
    title: 'Info OJK & Regulasi',
    description:
      'Pembaruan regulasi OJK terkini agar Anda selalu selaras dengan kebijakan sektor jasa keuangan.',
  },
  {
    icon: GraduationCap,
    title: 'Edukasi Keuangan',
    description:
      'Panduan literasi keuangan dari dasar hingga lanjutan untuk semua tingkat pengguna.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-finance-navy via-finance-navy-dark to-finance-navy text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-finance-gold rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-finance-navy-dark rounded-full blur-3xl" />
          </div>
          <div className="container relative mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-finance-gold/20 text-finance-gold border-finance-gold/30">
                Platform Keuangan #1 di Indonesia
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Diskusi Keuangan Terdepan di{' '}
                <span className="finance-text-gradient">Indonesia</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                Forum komunitas untuk berbagi pengalaman, mendapat solusi, dan
                memahami dunia keuangan: fintech, investasi, perbankan,
                asuransi, hingga regulasi OJK.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                  <Link href="/forum/">
                    Mulai Diskusi
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                  <Link href="/artikel/">
                    Baca Artikel
                  </Link>
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-3xl font-bold text-finance-gold">10K+</div>
                  <div className="text-sm text-gray-300">Anggota</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-finance-gold">5K+</div>
                  <div className="text-sm text-gray-300">Diskusi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-finance-gold">500+</div>
                  <div className="text-sm text-gray-300">Artikel</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Kategori Forum</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pilih topik keuangan yang ingin Anda diskusikan bersama komunitas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.href}>
                <Card className="h-full hover:border-finance-gold/50 hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <span className="text-4xl">{cat.icon}</span>
                      <Badge variant="secondary">{cat.count} diskusi</Badge>
                    </div>
                    <CardTitle className="mt-3">{cat.title}</CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Hot threads + features */}
        <section className="bg-muted/40">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Diskusi Terpopuler</h2>
                  <Link
                    href="/forum/"
                    className="text-sm text-finance-navy hover:text-finance-gold inline-flex items-center font-medium"
                  >
                    Lihat semua <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {hotThreads.map((thread) => (
                    <Link key={thread.slug} href={`/forum/${thread.slug}/`}>
                      <Card className="hover:border-finance-navy/40 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {thread.isPinned && (
                                  <Pin className="h-3.5 w-3.5 text-finance-gold" />
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {thread.category}
                                </Badge>
                              </div>
                              <h3 className="font-medium hover:text-finance-navy line-clamp-2">
                                {thread.title}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3.5 w-3.5" />
                              {thread.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              {thread.views}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Mengapa call-center.id?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <Card key={feature.title} className="h-full">
                      <CardHeader>
                        <feature.icon className="h-8 w-8 text-finance-navy mb-2" />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16">
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-finance-navy to-finance-navy-dark text-white">
            <CardContent className="p-10 md:p-16 text-center">
              <Users className="h-12 w-12 text-finance-gold mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Bergabung dengan Komunitas Keuangan Terbesar
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto mb-8">
                Daftar gratis dan mulai berdiskusi, bertanya, serta berbagi
                pengalaman keuangan Anda dengan ribuan anggota lainnya.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                  <Link href="/register/">
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                  <Link href="/login/">
                    Sudah punya akun? Masuk
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Explore */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/edukasi-keuangan/">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <GraduationCap className="h-10 w-10 text-finance-navy flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Edukasi Keuangan</h3>
                    <p className="text-sm text-muted-foreground">
                      Pelajari dasar hingga lanjutan manajemen keuangan.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/ojk-regulasi/">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <ShieldCheck className="h-10 w-10 text-finance-navy flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">OJK & Regulasi</h3>
                    <p className="text-sm text-muted-foreground">
                      Ikuti perkembangan regulasi sektor jasa keuangan.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/kontak/">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <TrendingUp className="h-10 w-10 text-finance-navy flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Hubungi Kami</h3>
                    <p className="text-sm text-muted-foreground">
                      Punya pertanyaan? Tim kami siap membantu Anda.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </div>
  );
}
