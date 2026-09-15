import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Plus, Search, MessageCircle, ThumbsUp, ThumbsDown, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock forum threads data
const forumThreads = [
  {
    id: 1,
    title: "Bagaimana cara keluar dari jeratan pinjol ilegal?",
    content: "Saya terjebak dengan beberapa pinjaman online ilegal dan sekarang ditagih dengan cara yang tidak wajar...",
    author: "Anonymous123",
    category: "Pinjaman Online",
    replies: 23,
    views: 456,
    upvotes: 15,
    downvotes: 2,
    timeAgo: "2 jam lalu",
    isPinned: true,
    slug: "bagaimana-cara-keluar-dari-jeratan-pinjol-ilegal",
    lastReply: {
      author: "FinancialAdvisor",
      timeAgo: "30 menit lalu",
    },
  },
  {
    id: 2,
    title: "Review Bank Digital Jenius vs Bank Jago - Mana yang lebih baik?",
    content: "Mau pindah ke bank digital, bingung pilih antara Jenius dan Bank Jago. Ada yang punya pengalaman?",
    author: "DigitalBanker",
    category: "Perbankan",
    replies: 18,
    views: 892,
    upvotes: 24,
    downvotes: 1,
    timeAgo: "4 jam lalu",
    isPinned: false,
    slug: "review-bank-digital-jenius-vs-bank-jago",
    lastReply: {
      author: "BankExpert",
      timeAgo: "1 jam lalu",
    },
  },
  {
    id: 3,
    title: "Tips investasi saham untuk gaji UMR",
    content: "Dengan gaji UMR, apakah masih bisa investasi saham? Berapa minimal yang harus dialokasikan?",
    author: "NewInvestor",
    category: "Investasi",
    replies: 31,
    views: 1250,
    upvotes: 42,
    downvotes: 3,
    timeAgo: "6 jam lalu",
    isPinned: false,
    slug: "tips-investasi-saham-untuk-gaji-umr",
    lastReply: {
      author: "StockGuru",
      timeAgo: "2 jam lalu",
    },
  },
];

const categoryDisplayNames: Record<string, string> = {
  'pinjaman-online': 'Pinjaman Online',
  'perbankan': 'Perbankan',
  'investasi': 'Investasi',
  'asuransi': 'Asuransi',
  'fintech': 'Fintech',
  'ojk-regulasi': 'OJK & Regulasi',
};

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category;
  const displayName = categoryDisplayNames[category] || category;

  return {
    title: `${displayName} | Forum Diskusi Keuangan | Call Center Finance Indonesia`,
    description: `Diskusi seputar ${displayName.toLowerCase()} - berbagi pengalaman dan dapatkan solusi masalah keuangan Anda.`,
    keywords: [category, 'forum keuangan', 'diskusi', 'fintech', 'investasi', 'perbankan'],
    alternates: { canonical: `https://www.call-center.id/forum/${category}/` },
    openGraph: {
      title: `${displayName} | Forum Diskusi Keuangan`,
      description: `Diskusi seputar ${displayName.toLowerCase()}`,
      url: `https://www.call-center.id/forum/${category}/`,
    },
  };
}

// Breadcrumb Schema
function generateBreadcrumbSchema(category: string) {
  const displayName = categoryDisplayNames[category] || category;
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
        "name": "Forum",
        "item": "https://www.call-center.id/forum/",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": displayName,
        "item": `https://www.call-center.id/forum/${category}/`,
      },
    ],
  };
}

// WebPage Schema
function generateWebPageSchema(category: string) {
  const displayName = categoryDisplayNames[category] || category;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${displayName} Forum`,
    "url": `https://www.call-center.id/forum/${category}/`,
    "description": `Diskusi seputar ${displayName.toLowerCase()}`,
    "publisher": {
      "@type": "Organization",
      "name": "Call Center Finance Indonesia",
    },
  };
}

export default function ForumCategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = params.category;
  const displayName = categoryDisplayNames[category] || category;

  // Check if category exists
  if (!categoryDisplayNames[category]) {
    return notFound();
  }

  const searchTerm = searchParams.search as string || '';
  const sortBy = searchParams.sort as string || 'latest';

  const filteredThreads = forumThreads.filter((thread) => {
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = thread.category.toLowerCase().replace(/[\s&]/g, '-') === category;
    return matchesSearch && matchesCategory;
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.upvotes + b.replies) - (a.upvotes + a.replies);
      case 'replies':
        return b.replies - a.replies;
      case 'views':
        return b.views - a.views;
      default:
        return b.id - a.id;
    }
  });

  const breadcrumbSchema = generateBreadcrumbSchema(category);
  const webpageSchema = generateWebPageSchema(category);

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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Forum {displayName}</h1>
                  <p className="text-muted-foreground">
                    Diskusi seputar {displayName.toLowerCase()}
                  </p>
                </div>
                <Link href="/forum/new/" passHref legacyBehavior>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Buat Thread Baru
                  </Button>
                </Link>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Cari diskusi..."
                    defaultValue={searchTerm}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue={sortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Urutkan berdasarkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Terbaru</SelectItem>
                    <SelectItem value="popular">Terpopuler</SelectItem>
                    <SelectItem value="replies">Balasan Terbanyak</SelectItem>
                    <SelectItem value="views">Views Terbanyak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Forum Threads */}
              <div className="space-y-4">
                {sortedThreads.map((thread) => (
                  <Card key={thread.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {thread.isPinned && (
                              <Pin className="h-4 w-4 text-finance-gold" />
                            )}
                            <Badge variant="secondary">{thread.category}</Badge>
                            <span className="text-sm text-muted-foreground">{thread.timeAgo}</span>
                          </div>
                          <CardTitle className="text-lg mb-2">
                            <Link href={`/forum/${thread.slug}/`} className="hover:text-primary transition-colors">
                              {thread.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-2 mb-3">
                            {thread.content}
                          </CardDescription>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <span>oleh</span>
                            <span className="font-medium">{thread.author}</span>
                            {thread.lastReply && (
                              <>
                                <span className="mx-2">•</span>
                                <span>terakhir oleh {thread.lastReply.author} {thread.lastReply.timeAgo}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{thread.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{thread.upvotes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-600 transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{thread.downvotes}</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sortedThreads.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Tidak ada diskusi yang ditemukan di kategori {displayName}</p>
                  <Link href="/forum/" className="inline-block mt-4 text-primary hover:underline">
                    Kembali ke Forum Utama
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              {/* Categories */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(categoryDisplayNames).map(([slug, name]) => (
                      <Link
                        key={slug}
                        href={`/forum/${slug}/`}
                        className={`block p-2 rounded-md text-sm transition-colors ${
                          slug === category
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Forum Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Aturan Forum</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-finance-gold mt-1">•</span>
                      <span>Gunakan bahasa yang sopan dan menghormati</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-finance-gold mt-1">•</span>
                      <span>Tidak diperbolehkan promosi produk tanpa izin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-finance-gold mt-1">•</span>
                      <span>Berikan informasi yang akurat dan terverifikasi</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
