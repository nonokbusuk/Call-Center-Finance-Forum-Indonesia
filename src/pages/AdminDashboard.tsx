import { useState } from 'react'
import { Users, MessageCircle, FileText, TrendingUp, Eye, Ban, Trash2, Pin, Edit, Settings } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

console.log('AdminDashboard component loaded')

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days')

  // Mock admin statistics
  const stats = {
    totalUsers: 25420,
    activeUsers: 3240,
    totalThreads: 8950,
    totalComments: 45680,
    totalArticles: 1250,
    dailyVisitors: 15680
  }

  // Mock recent threads for moderation
  const recentThreads = [
    {
      id: 1,
      title: "Cara mengatasi pinjol ilegal yang terus menagih",
      author: "UserABC123",
      category: "Pinjaman Online",
      status: "active",
      reports: 2,
      createdAt: "2024-01-15 14:30",
      replies: 23,
      views: 456
    },
    {
      id: 2,
      title: "Review Bank Digital Terbaru 2024",
      author: "BankReviewer",
      category: "Perbankan",
      status: "pinned",
      reports: 0,
      createdAt: "2024-01-15 10:15",
      replies: 18,
      views: 892
    },
    {
      id: 3,
      title: "SPAM: Investasi bodong berkedok crypto",
      author: "SpammerXYZ",
      category: "Investasi",
      status: "reported",
      reports: 8,
      createdAt: "2024-01-15 09:45",
      replies: 5,
      views: 234
    }
  ]

  // Mock users for management
  const recentUsers = [
    {
      id: 1,
      username: "FinanceExpert",
      email: "expert@email.com",
      joinDate: "2024-01-10",
      status: "active",
      threads: 15,
      comments: 89,
      reputation: 450
    },
    {
      id: 2,
      username: "InvestorPro",
      email: "investor@email.com",
      joinDate: "2024-01-12",
      status: "active",
      threads: 8,
      comments: 34,
      reputation: 210
    },
    {
      id: 3,
      username: "SpammerBot",
      email: "spam@fake.com",
      joinDate: "2024-01-14",
      status: "banned",
      threads: 25,
      comments: 2,
      reputation: -50
    }
  ]

  const handleThreadAction = (threadId: number, action: string) => {
    console.log(`Thread ${threadId} action: ${action}`)
    // Implementation for thread moderation actions
  }

  const handleUserAction = (userId: number, action: string) => {
    console.log(`User ${userId} action: ${action}`)
    // Implementation for user management actions
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Kelola forum call-center.id</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">24 Jam</SelectItem>
              <SelectItem value="7days">7 Hari</SelectItem>
              <SelectItem value="30days">30 Hari</SelectItem>
              <SelectItem value="90days">90 Hari</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Pengaturan
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Aktif</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% dari minggu lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Thread</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalThreads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Komentar</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artikel</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArticles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+3% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengunjung Harian</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dailyVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+7% dari kemarin</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="threads" className="space-y-6">
        <TabsList>
          <TabsTrigger value="threads">Kelola Thread</TabsTrigger>
          <TabsTrigger value="users">Kelola User</TabsTrigger>
          <TabsTrigger value="articles">Artikel</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="threads">
          <Card>
            <CardHeader>
              <CardTitle>Thread Management</CardTitle>
              <CardDescription>
                Kelola thread forum, moderasi konten, dan pin topik penting
              </CardDescription>
              <div className="flex gap-4">
                <Input placeholder="Cari thread..." className="max-w-sm" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="pinned">Pinned</SelectItem>
                    <SelectItem value="reported">Dilaporkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thread</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Laporan</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentThreads.map((thread) => (
                    <TableRow key={thread.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{thread.title}</div>
                          <div className="text-sm text-muted-foreground">{thread.createdAt}</div>
                        </div>
                      </TableCell>
                      <TableCell>{thread.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{thread.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            thread.status === 'active' ? 'default' : 
                            thread.status === 'pinned' ? 'secondary' : 'destructive'
                          }
                        >
                          {thread.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {thread.reports > 0 && (
                          <Badge variant="destructive">{thread.reports}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{thread.replies} balasan</div>
                          <div className="text-muted-foreground">{thread.views} views</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleThreadAction(thread.id, 'view')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleThreadAction(thread.id, 'pin')}
                          >
                            <Pin className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleThreadAction(thread.id, 'edit')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleThreadAction(thread.id, 'delete')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Kelola akun pengguna, moderasi user, dan statistik aktivitas
              </CardDescription>
              <div className="flex gap-4">
                <Input placeholder="Cari user..." className="max-w-sm" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aktivitas</TableHead>
                    <TableHead>Reputasi</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.username}</div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            user.status === 'active' ? 'default' : 'destructive'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{user.threads} thread</div>
                          <div className="text-muted-foreground">{user.comments} komentar</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.reputation > 0 ? 'default' : 'destructive'}
                        >
                          {user.reputation}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserAction(user.id, 'view')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserAction(user.id, 'edit')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={user.status === 'banned' ? 'default' : 'destructive'}
                            onClick={() => handleUserAction(user.id, user.status === 'banned' ? 'unban' : 'ban')}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>Article Management</CardTitle>
              <CardDescription>
                Kelola artikel dan publikasi finansial
              </CardDescription>
              <div className="flex gap-4">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Tambah Artikel Baru
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Article management interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>
                Laporan aktivitas dan analitik forum
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Reports and analytics interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard