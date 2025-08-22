import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Eye, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

console.log('ArticlesPage component loaded')

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock articles data
  const articles = [
    {
      id: 1,
      title: "OJK Luncurkan Roadmap Pengembangan Fintech 2024-2029",
      excerpt: "Otoritas Jasa Keuangan (OJK) resmi meluncurkan roadmap pengembangan teknologi finansial untuk periode 2024-2029 yang fokus pada inovasi berkelanjutan dan perlindungan konsumen.",
      content: "Roadmap ini mencakup berbagai aspek pengembangan fintech di Indonesia...",
      author: "Tim Redaksi",
      publishDate: "2024-01-15",
      category: "OJK",
      tags: ["OJK", "Fintech", "Regulasi", "Roadmap"],
      readTime: 5,
      views: 1250,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Tren Investasi Cryptocurrency di Indonesia Tahun 2024",
      excerpt: "Pasar cryptocurrency Indonesia menunjukkan pertumbuhan signifikan dengan berbagai inovasi produk dan regulasi yang semakin jelas dari pemerintah.",
      content: "Cryptocurrency telah menjadi alternatif investasi yang menarik bagi masyarakat Indonesia...",
      author: "Crypto Analyst",
      publishDate: "2024-01-14",
      category: "Investasi",
      tags: ["Cryptocurrency", "Bitcoin", "Investasi", "Digital Asset"],
      readTime: 8,
      views: 2100,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Perbandingan Bunga Deposito Bank Digital vs Bank Konvensional",
      excerpt: "Bank digital menawarkan suku bunga deposito yang lebih kompetitif dibanding bank konvensional. Simak perbandingan lengkapnya di sini.",
      content: "Dalam era digital banking, persaingan suku bunga deposito semakin ketat...",
      author: "Banking Expert",
      publishDate: "2024-01-13",
      category: "Perbankan",
      tags: ["Deposito", "Bank Digital", "Suku Bunga", "Investasi"],
      readTime: 6,
      views: 890,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Cara Memilih Asuransi Jiwa yang Tepat untuk Keluarga Muda",
      excerpt: "Panduan lengkap memilih asuransi jiwa untuk keluarga muda, mulai dari jenis produk hingga tips memilih perusahaan asuransi terpercaya.",
      content: "Asuransi jiwa merupakan salah satu produk keuangan yang penting untuk keluarga muda...",
      author: "Insurance Advisor",
      publishDate: "2024-01-12",
      category: "Asuransi",
      tags: ["Asuransi Jiwa", "Keluarga", "Proteksi", "Financial Planning"],
      readTime: 7,
      views: 650,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Mengenal Lebih Dekat Aplikasi E-Wallet Terpopuler di Indonesia",
      excerpt: "Review mendalam tentang fitur, keamanan, dan keunggulan dari aplikasi e-wallet terpopuler di Indonesia seperti GoPay, OVO, DANA, dan ShopeePay.",
      content: "E-wallet telah menjadi bagian tak terpisahkan dari kehidupan digital masyarakat Indonesia...",
      author: "Fintech Reviewer",
      publishDate: "2024-01-11",
      category: "Fintech",
      tags: ["E-Wallet", "Digital Payment", "GoPay", "OVO", "DANA"],
      readTime: 9,
      views: 1820,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop"
    }
  ]

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'fintech', label: 'Fintech' },
    { value: 'ojk', label: 'OJK & Regulasi' },
    { value: 'perbankan', label: 'Perbankan' },
    { value: 'asuransi', label: 'Asuransi' },
    { value: 'investasi', label: 'Investasi' }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           article.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleShare = (platform: string, article: any) => {
    const url = `https://call-center.id/artikel/${article.id}`
    const text = article.title
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`)
        break
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
    }
  }

  return (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
      {filteredArticles.length > 0 && (
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <Badge className="mb-3 bg-finance-gold text-finance-navy">
                Featured
              </Badge>
              <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                {filteredArticles[0].title}
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
              <Button>Baca Selengkapnya</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(1).map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="text-xs text-muted-foreground">
                  {article.readTime} min baca
                </span>
              </div>
              <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                {article.title}
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
                
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleShare('whatsapp', article)}
                    title="Share ke WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleShare('facebook', article)}
                    title="Share ke Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleShare('twitter', article)}
                    title="Share ke Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
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
  )
}

export default ArticlesPage