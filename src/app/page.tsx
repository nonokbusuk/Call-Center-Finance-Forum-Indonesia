import Link from 'next/link';
import {
  MessageCircle,
  Newspaper,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Users,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Call Center Finance Forum Indonesia',
  description:
    'Forum diskusi keuangan Indonesia: fintech, investasi, perbankan, asuransi, dan OJK. Berbagi pengalaman dan dapatkan solusi masalah keuangan Anda.',
  alternates: { canonical: 'https://www.call-center.id/' },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Call Center Finance Indonesia',
  url: 'https://www.call-center.id/',
  publisher: {
    '@type': 'Organization',
    name: 'Call Center Finance Indonesia',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Call Center Finance Indonesia',
  url: 'https://www.call-center.id/',
};

const features = [
  {
    icon: MessageCircle,
    title: 'Forum Diskusi',
    description: 'Diskusikan masalah keuangan, pinjaman online, dan investasi bersama komunitas.',
    href: '/forum/',
    cta: 'Gabung Diskusi',
  },
  {
    icon: Newspaper,
    title: 'Artikel & Berita',
    description: 'Baca artikel terbaru seputar keuangan, fintech, dan regulasi di Indonesia.',
    href: '/artikel/',
    cta: 'Baca Artikel',
  },
  {
    icon: ShieldCheck,
    title: 'OJK & Regulasi',
    description: 'Pelajari regulasi terbaru OJK dan perlindungan konsumen layanan keuangan.',
    href: '/ojk-regulasi/',
    cta: 'Lihat Regulasi',
  },
  {
    icon: GraduationCap,
    title: 'Edukasi Keuangan',
    description: 'Tingkatkan literasi keuangan Anda melalui materi edukasi yang terpercaya.',
    href: '/edukasi-keuangan/',
    cta: 'Mulai Belajar',
  },
];

const stats = [
  { icon: Users, label: 'Anggota Aktif', value: '12.5K+' },
  { icon: MessageCircle, label: 'Diskusi', value: '3.2K+' },
  { icon: ThumbsUp, label: 'Solusi Terverifikasi', value: '8.7K+' },
  { icon: TrendingUp, label: 'Artikel Diterbitkan', value: '540+' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-finance-navy via-finance-navy-dark to-background text-white">
          <div className="container mx-auto px-4 py-20 lg:py-28">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-finance-gold/20 text-finance-gold hover:bg-finance-gold/30">
                Forum Keuangan Indonesia
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Solusi Masalah Keuangan Anda{' '}
                <span className="text-finance-gold">Bersama Komunitas</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di
                Indonesia. Berbagi pengalaman, dapatkan insight, dan tingkatkan literasi keuangan Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/forum/" passHref legacyBehavior>
                  <Button size="lg" className="bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                    Mulai Diskusi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/edukasi-keuangan/" passHref legacyBehavior>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Edukasi Keuangan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-background">
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-7 w-7 mx-auto mb-2 text-finance-gold" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Jelajahi Platform Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk memahami dan menyelesaikan masalah keuangan, dalam satu tempat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <feature.icon className="h-9 w-9 text-finance-navy mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    {feature.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-finance-navy text-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Siap Bergabung dengan Komunitas?</h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Daftar gratis dan mulai berdiskusi dengan ribuan anggota lainnya seputar keuangan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/" passHref legacyBehavior>
                <Button size="lg" className="bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="/kontak/" passHref legacyBehavior>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
