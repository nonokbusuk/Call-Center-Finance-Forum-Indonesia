import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus, Search, MessageCircle, ThumbsUp, ThumbsDown, Pin } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

console.log('ForumPage component loaded')

interface Thread {
  id: number
  title: string
  content: string
  author: string
  category: string
  replies: number
  views: number
  upvotes: number
  downvotes: number
  timeAgo: string
  isPinned: boolean
  lastReply?: { author: string; timeAgo: string } | null
}

const ForumPage = () => {
  const { category } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  const [forumThreads, setForumThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/forum')
        if (!res.ok) throw new Error('Gagal memuat data')
        const data: Thread[] = await res.json()
        setForumThreads(data)
        setError(null)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Terjadi kesalahan')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchThreads()
  }, [])

  const categories = [
    "Semua Kategori",
    "Pinjaman Online", 
    "Perbankan",
    "Investasi",
    "Asuransi", 
    "Fintech",
    "OJK & Regulasi"
  ]

  const filteredThreads = forumThreads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !category || category === 'all' || 
                           thread.category.toLowerCase().replace(' ', '-').replace('&', '') === category
    return matchesSearch && matchesCategory
  })

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.upvotes + b.replies) - (a.upvotes + a.replies)
      case 'replies':
        return b.replies - a.replies
      case 'views':
        return b.views - a.views
      default: // latest
        return b.id - a.id
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Forum Diskusi</h1>
              <p className="text-muted-foreground">
                Berbagi pengalaman dan dapatkan solusi masalah keuangan Anda
              </p>
            </div>
            <Link to="/forum/new">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
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
          {loading && <p>Memuat...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <>
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
                          <CardTitle className="text-lg mb-2 hover:text-primary transition-colors cursor-pointer">
                            {thread.title}
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
                  <p className="text-muted-foreground">Tidak ada diskusi yang ditemukan</p>
                </div>
              )}
            </>
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
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={cat === "Semua Kategori" ? "/forum" : `/forum/${cat.toLowerCase().replace(' ', '-').replace('&', '')}`}
                    className={`block p-2 rounded-md text-sm transition-colors ${
                      (!category && cat === "Semua Kategori") ||
                      cat.toLowerCase().replace(' ', '-').replace('&', '') === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {cat}
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
                <li className="flex items-start gap-2">
                  <span className="text-finance-gold mt-1">•</span>
                  <span>Hindari spam dan posting berulang</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-finance-gold mt-1">•</span>
                  <span>Laporkan konten yang melanggar aturan</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForumPage