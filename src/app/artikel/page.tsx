import { Metadata } from 'next';
import { Calendar, User, Eye, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Artikel & Publikasi Keuangan | Call Center Finance Indonesia',
  description: 'Dapatkan insight terbaru seputar dunia keuangan Indonesia, dari berita terkini hingga analisis mendalam tentang industri finansial.',
  keywords: ['artikel keuangan', 'berita fintech', 'investasi', 'perbankan', 'asuransi', 'OJK', 'regulasi'],
  alternates: { canonical: 'https://www.call-center.id/artikel/' },
  openGraph: {
    title: 'Artikel & Publikasi Keuangan | Call Center Finance Indonesia',
    description: 'Dapatkan insight terbaru seputar dunia keuangan Indonesia',
    url: 'https://www.call-center.id/artikel/',
  },
};

import { prisma } from '@/lib/db';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.call-center.id/" },
    { "@type": "ListItem", "position": 2, "name": "Artikel", "item": "https://www.call-center.id/artikel/" },
  ],
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Artikel & Publikasi Keuangan",
  "url": "https://www.call-center.id/artikel/",
  "description": "Dapatkan insight terbaru seputar dunia keuangan Indonesia",
  "publisher": { "@type": "Organization", "name": "Call Center Finance Indonesia" },
};

export const dynamic = 'force-dynamic';

const categories = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'ojk', label: 'OJK & Regulasi' },
  { value: 'perbankan', label: 'Perbankan' },
  { value: 'asuransi', label: 'Asuransi' },
  { value: 'investasi', label: 'Investasi' },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = searchParams.search as string || '';
  const selectedCategory = searchParams.category as string || 'all';

  const dbArticles = await prisma.article.findMany({
    where: {
      published: true,
      AND: [
        searchTerm
          ? {
              OR: [
                { title: { contains: searchTerm } },
                { excerpt: { contains: searchTerm } },
              ],
            }
          : {},
        selectedCategory !== 'all'
          ? { category: selectedCategory }
          : {},
      ],
    },
    orderBy: { publishDate: 'desc' },
  });

  const filteredArticles = dbArticles.map((a) => ({
    ...a,
    tags: a.tags ? a.tags.split(',').map((t) => t.trim()) : [],
    publishDate: a.publishDate.toISOString(),
  }));

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

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Artikel & Publikasi</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dapatkan insight terbaru seputar dunia keuangan Indonesia,
              dari berita terkini hingga analisis mendalam tentang industri finansial
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Cari artikel..."
                defaultValue={searchTerm}
                className="w-full"
              />
            </div>
            <Select defaultValue={selectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Featured Article */}
          {filteredArticles.length > 0 && filteredArticles[0].image && (
            <Card className="mb-12 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="w-full h-64 md:h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <Badge className="mb-3 bg-finance-gold text-finance-navy">
                    Featured
                  </Badge>
                  <h2 className="text-2xl font-bold mb-3">
                    <Link href={`/artikel/${filteredArticles[0].slug}/`} className="hover:text-primary transition-colors">
                      {filteredArticles[0].title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {filteredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{filteredArticles[0].author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(filteredArticles[0].publishDate).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{filteredArticles[0].views}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filteredArticles[0].tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/artikel/${filteredArticles[0].slug}/`} passHref legacyBehavior>
                    <Button>Baca Selengkapnya</Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(1).map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {article.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime} min baca
                    </span>
                  </div>
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
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.publishDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{article.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada artikel yang ditemukan</p>
            </div>
          )}

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
        </div>
      </main>

      <Footer />
    </div>
  );
}
