import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MessageCircle, Users, TrendingUp, Award } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

console.log('HomePage component loaded')

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Mock data for news slider
  const newsSlides = [
    {
      id: 1,
      title: "OJK Keluarkan Regulasi Baru untuk Fintech Lending",
      description: "Otoritas Jasa Keuangan merilis peraturan terbaru yang mengatur kegiatan peer-to-peer lending di Indonesia",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      category: "Regulasi"
    },
    {
      id: 2,
      title: "Bank Digital Berlomba Tawarkan Suku Bunga Kompetitif",
      description: "Persaingan ketat bank digital dalam menawarkan produk deposito dengan bunga tinggi untuk menarik nasabah",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "Perbankan"
    },
    {
      id: 3,
      title: "Investasi Saham Syariah Tumbuh 150% di 2024",
      description: "Minat masyarakat terhadap investasi saham syariah mengalami peningkatan signifikan sepanjang tahun ini",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      category: "Investasi"
    }
  ]

  // Mock data for popular topics
  const popularTopics = [
    {
      id: 1,
      title: "Cara Mengatasi Tagihan Kartu Kredit yang Menunggak",
      category: "Perbankan",
      replies: 45,
      views: 1250,
      author: "FinanceExpert",
      timeAgo: "2 jam lalu"
    },
    {
      id: 2,
      title: "Review Aplikasi Pinjol Terpercaya 2024",
      category: "Fintech",
      replies: 32,
      views: 890,
      author: "TechAnalyst",
      timeAgo: "4 jam lalu"
    },
    {
      id: 3,
      title: "Tips Investasi Reksadana untuk Pemula",
      category: "Investasi",
      replies: 28,
      views: 650,
      author: "InvestorPro",
      timeAgo: "6 jam lalu"
    },
    {
      id: 4,
      title: "Perbandingan Asuransi Kesehatan Swasta vs BPJS",
      category: "Asuransi",
      replies: 19,
      views: 420,
      author: "HealthInsure",
      timeAgo: "8 jam lalu"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [newsSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with News Slider */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 finance-gradient opacity-90"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Forum Keuangan Indonesia Terdepan
                </h1>
                <p className="text-xl mb-6 opacity-90">
                  Diskusi, berbagi pengalaman, dan dapatkan insight terbaru seputar dunia finansial Indonesia
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/forum">
                    <Button size="lg" className="bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                      Mulai Diskusi
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-finance-navy">
                      Daftar Sekarang
                    </Button>
                  </Link>
                </div>
              </div>

              {/* News Slider */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {newsSlides.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0">
                      <div className="aspect-video relative">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <Badge className="mb-2 bg-finance-gold text-finance-navy">
                            {slide.category}
                          </Badge>
                          <h3 className="font-semibold text-lg mb-2">{slide.title}</h3>
                          <p className="text-sm opacity-90">{slide.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Slider Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Slider Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {newsSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentSlide ? 'bg-finance-gold' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-finance-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-finance-navy">25K+</h3>
              <p className="text-muted-foreground">Anggota Aktif</p>
            </div>
            <div className="text-center">
              <div className="bg-finance-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-finance-navy">150K+</h3>
              <p className="text-muted-foreground">Diskusi</p>
            </div>
            <div className="text-center">
              <div className="bg-finance-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-finance-navy">500+</h3>
              <p className="text-muted-foreground">Artikel Finansial</p>
            </div>
            <div className="text-center">
              <div className="bg-finance-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-finance-navy">99%</h3>
              <p className="text-muted-foreground">Kepuasan User</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Topik Paling Aktif</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ikuti diskusi terpopuler seputar keuangan, fintech, investasi, dan berbagai topik finansial lainnya
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {popularTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{topic.category}</Badge>
                        <span className="text-sm text-muted-foreground">{topic.timeAgo}</span>
                      </div>
                      <CardTitle className="text-lg mb-2 hover:text-primary transition-colors">
                        {topic.title}
                      </CardTitle>
                      <CardDescription>
                        oleh <span className="font-medium">{topic.author}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{topic.replies} balasan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{topic.views} views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/forum">
              <Button size="lg">
                Lihat Semua Diskusi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Kategori Diskusi</h2>
            <p className="text-muted-foreground">
              Temukan topik yang sesuai dengan kebutuhan finansial Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Pinjaman Online",
                description: "Diskusi seputar fintech lending, P2P, dan pinjaman digital",
                icon: "💰",
                count: "2.5K diskusi"
              },
              {
                name: "Perbankan",
                description: "Produk bank, kartu kredit, tabungan, dan layanan perbankan",
                icon: "🏦",
                count: "3.2K diskusi"
              },
              {
                name: "Investasi",
                description: "Saham, reksadana, obligasi, dan instrumen investasi lainnya",
                icon: "📈",
                count: "1.8K diskusi"
              },
              {
                name: "Asuransi",
                description: "Asuransi jiwa, kesehatan, kendaraan, dan properti",
                icon: "🛡️",
                count: "950 diskusi"
              },
              {
                name: "Fintech",
                description: "Aplikasi keuangan, e-wallet, dan teknologi finansial",
                icon: "📱",
                count: "1.5K diskusi"
              },
              {
                name: "OJK & Regulasi",
                description: "Peraturan, kebijakan, dan update dari otoritas keuangan",
                icon: "⚖️",
                count: "680 diskusi"
              }
            ].map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {category.count}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage