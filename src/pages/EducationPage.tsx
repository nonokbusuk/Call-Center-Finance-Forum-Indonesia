import { useState } from 'react'
import { BookOpen, FileText, Video, Download, ExternalLink, Search } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

console.log('EducationPage component loaded')

const EducationPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock educational content
  const regulations = [
    {
      id: 1,
      title: "POJK No. 77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi",
      description: "Peraturan OJK yang mengatur tentang fintech peer-to-peer lending di Indonesia",
      category: "P2P Lending",
      publishDate: "2016-12-29",
      fileSize: "2.3 MB",
      type: "PDF"
    },
    {
      id: 2,
      title: "SEOJK No. 18/SEOJK.02/2017 tentang Tata Kelola Teknologi Informasi bagi Bank Umum",
      description: "Surat edaran OJK tentang tata kelola teknologi informasi untuk perbankan",
      category: "Perbankan",
      publishDate: "2017-06-30",
      fileSize: "1.8 MB",
      type: "PDF"
    },
    {
      id: 3,
      title: "POJK No. 12/POJK.07/2018 tentang Penyelenggaraan Usaha Perusahaan Asuransi",
      description: "Regulasi terbaru tentang penyelenggaraan usaha perusahaan asuransi",
      category: "Asuransi",
      publishDate: "2018-04-16",
      fileSize: "3.1 MB",
      type: "PDF"
    }
  ]

  const educationalVideos = [
    {
      id: 1,
      title: "Dasar-dasar Investasi untuk Pemula",
      description: "Video edukasi tentang konsep dasar investasi yang wajib dipahami pemula",
      duration: "25:30",
      views: 15200,
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "Cara Memilih Produk Perbankan yang Tepat",
      description: "Panduan lengkap memilih produk perbankan sesuai kebutuhan finansial",
      duration: "18:45",
      views: 8900,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "Mengenal Fintech dan Dampaknya bagi Masyarakat",
      description: "Penjelasan komprehensif tentang fintech dan manfaatnya dalam kehidupan sehari-hari",
      duration: "32:15",
      views: 12500,
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop"
    }
  ]

  const learningModules = [
    {
      id: 1,
      title: "Perencanaan Keuangan Personal",
      description: "Modul pembelajaran tentang cara merencanakan keuangan pribadi yang sehat",
      lessons: 8,
      duration: "4 jam",
      level: "Pemula",
      topics: ["Budgeting", "Emergency Fund", "Debt Management", "Goal Setting"]
    },
    {
      id: 2,
      title: "Investasi Pasar Modal",
      description: "Panduan lengkap berinvestasi di pasar modal Indonesia",
      lessons: 12,
      duration: "6 jam",
      level: "Menengah",
      topics: ["Saham", "Obligasi", "Reksadana", "Analisis Fundamental"]
    },
    {
      id: 3,
      title: "Asuransi dan Proteksi Finansial",
      description: "Memahami berbagai produk asuransi dan cara memilih yang tepat",
      lessons: 6,
      duration: "3 jam",
      level: "Pemula",
      topics: ["Asuransi Jiwa", "Asuransi Kesehatan", "Asuransi Kendaraan", "Unit Link"]
    }
  ]

  const filteredRegulations = regulations.filter(reg =>
    reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Edukasi & Regulasi Keuangan</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Tingkatkan literasi finansial Anda dengan materi edukasi berkualitas dan 
          pahami regulasi terbaru dari Otoritas Jasa Keuangan (OJK)
        </p>
      </div>

      <Tabs defaultValue="education" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="education">Edukasi Keuangan</TabsTrigger>
          <TabsTrigger value="regulations">OJK & Regulasi</TabsTrigger>
        </TabsList>

        <TabsContent value="education" className="space-y-8">
          {/* Learning Modules */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Modul Pembelajaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningModules.map((module) => (
                <Card key={module.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={module.level === 'Pemula' ? 'default' : 'secondary'}>
                        {module.level}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {module.lessons} pelajaran • {module.duration}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Topik Pembelajaran:</h4>
                        <div className="flex flex-wrap gap-1">
                          {module.topics.map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Mulai Belajar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Educational Videos */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Video Edukasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationalVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="lg" className="rounded-full">
                        <Video className="w-6 h-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{video.views.toLocaleString()} views</span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Tonton
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Financial Tips */}
          <section className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Tips Keuangan Harian</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-finance-navy mb-3">💰 Atur Anggaran 50-30-20</h3>
                <p className="text-sm text-muted-foreground">
                  Alokasikan 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan dan investasi.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-finance-navy mb-3">🏦 Manfaatkan Deposito</h3>
                <p className="text-sm text-muted-foreground">
                  Untuk dana darurat, pilih deposito yang memberikan bunga kompetitif dan dapat dicairkan kapan saja.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-finance-navy mb-3">📈 Diversifikasi Investasi</h3>
                <p className="text-sm text-muted-foreground">
                  Jangan menaruh semua uang di satu instrumen investasi. Sebarkan risiko dengan diversifikasi portofolio.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-finance-navy mb-3">🛡️ Lindungi dengan Asuransi</h3>
                <p className="text-sm text-muted-foreground">
                  Miliki asuransi kesehatan dan jiwa untuk melindungi diri dan keluarga dari risiko finansial.
                </p>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-8">
          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari regulasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* OJK Regulations */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Peraturan OJK Terbaru</h2>
            <div className="space-y-4">
              {filteredRegulations.map((regulation) => (
                <Card key={regulation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{regulation.category}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(regulation.publishDate).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <CardTitle className="text-lg mb-2">{regulation.title}</CardTitle>
                        <CardDescription>{regulation.description}</CardDescription>
                      </div>
                      <div className="flex flex-col items-center gap-2 ml-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{regulation.fileSize}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download {regulation.type}
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section className="bg-finance-navy text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Link Penting</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="https://www.ojk.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
              >
                <h3 className="font-semibold mb-2">Website OJK</h3>
                <p className="text-sm text-gray-300">
                  Kunjungi situs resmi Otoritas Jasa Keuangan untuk informasi terlengkap
                </p>
              </a>
              <a
                href="https://konsumen.ojk.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
              >
                <h3 className="font-semibold mb-2">Layanan Konsumen</h3>
                <p className="text-sm text-gray-300">
                  Laporkan masalah dengan lembaga jasa keuangan melalui portal konsumen OJK
                </p>
              </a>
              <a
                href="https://sikapiuangmu.ojk.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
              >
                <h3 className="font-semibold mb-2">Sikapi Uangmu</h3>
                <p className="text-sm text-gray-300">
                  Program literasi dan edukasi keuangan dari OJK untuk masyarakat
                </p>
              </a>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EducationPage