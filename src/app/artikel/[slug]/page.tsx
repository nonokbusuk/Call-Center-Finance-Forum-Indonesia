import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, User, Eye, Share2, Facebook, Twitter, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getArticle(slug: string) {
  return prisma.article.findUnique({ where: { slug } });
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel yang Anda cari tidak ditemukan.',
    };
  }

  return {
    title: `${article.title} | Call Center Finance Indonesia`,
    description: article.excerpt,
    keywords: [...(article.tags ? article.tags.split(",") : []), 'artikel keuangan', 'berita fintech', 'investasi'],
    alternates: { canonical: `https://www.call-center.id/artikel/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.call-center.id/artikel/${article.slug}/`,
      images: article.image
        ? [
            {
              url: article.image,
              width: 800,
              height: 400,
              alt: article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
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

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const dbArticle = await getArticle(params.slug);
  const relatedArticles = dbArticle
    ? await prisma.article.findMany({
        where: { slug: { not: params.slug }, published: true },
        orderBy: { publishDate: 'desc' },
        take: 3,
      })
    : [];

  if (!dbArticle) {
    return notFound();
  }

  const article = {
    ...dbArticle,
    tags: dbArticle.tags ? dbArticle.tags.split(',').map((t) => t.trim()) : [],
    publishDate: dbArticle.publishDate.toISOString(),
  };

  const breadcrumbSchema = generateBreadcrumbSchema(article);
  const articleSchema = generateArticleSchema(article);
  const webpageSchema = generateWebPageSchema(article);

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
              {article.image && (
              <div className="mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full max-h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              )}

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
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' https://www.call-center.id/artikel/' + article.slug + '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 hover:text-primary"
                  title="Share ke WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.call-center.id/artikel/' + article.slug + '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 hover:text-primary"
                  title="Share ke Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://www.call-center.id/artikel/' + article.slug + '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 hover:text-primary"
                  title="Share ke Twitter"
                >
                  <Twitter className="h-4 w-4" />
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
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' https://www.call-center.id/artikel/' + article.slug + '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 hover:text-primary"
                  title="Share ke WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.call-center.id/artikel/' + article.slug + '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 hover:text-primary"
                  title="Share ke Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://www.call-center.id/artikel/' + article.slug + '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 hover:text-primary"
                  title="Share ke Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                    <Card key={related.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {related.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      )}
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
