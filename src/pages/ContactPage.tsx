import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { toast } from 'sonner'

console.log('ContactPage component loaded')

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    toast.success('Pesan Anda telah terkirim! Kami akan merespons dalam 1x24 jam.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Punya pertanyaan, saran, atau butuh bantuan? Tim call-center.id siap membantu Anda 24/7. 
          Jangan ragu untuk menghubungi kami melalui berbagai channel yang tersedia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-finance-gold" />
                Telepon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">+62 21 1500 888</p>
              <p className="text-sm text-muted-foreground">Layanan 24 jam setiap hari</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-finance-gold" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">info@call-center.id</p>
              <p className="text-sm text-muted-foreground">Respons dalam 1x24 jam</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-finance-gold" />
                Alamat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Menara Keuangan Indonesia</p>
              <p className="text-muted-foreground">
                Jl. Sudirman No. 123<br />
                Jakarta Pusat 10270<br />
                Indonesia
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-finance-gold" />
                Jam Operasional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span className="font-medium">08:00 - 22:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu - Minggu</span>
                  <span className="font-medium">09:00 - 18:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Chat Support</span>
                  <span className="font-medium">24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Ikuti Kami</CardTitle>
              <CardDescription>
                Dapatkan update terbaru di media sosial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-finance-navy text-white p-2 rounded-full hover:bg-finance-navy/80 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-finance-navy text-white p-2 rounded-full hover:bg-finance-navy/80 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-finance-navy text-white p-2 rounded-full hover:bg-finance-navy/80 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-finance-navy text-white p-2 rounded-full hover:bg-finance-navy/80 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda kembali
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Pertanyaan Umum</SelectItem>
                        <SelectItem value="technical">Bantuan Teknis</SelectItem>
                        <SelectItem value="partnership">Kerjasama</SelectItem>
                        <SelectItem value="complaint">Keluhan</SelectItem>
                        <SelectItem value="suggestion">Saran</SelectItem>
                        <SelectItem value="media">Media & Press</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Subjek pesan"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    className="min-h-32"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Pertanyaan yang Sering Diajukan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-finance-gold pl-4">
                  <h4 className="font-semibold text-finance-navy mb-1">
                    Bagaimana cara bergabung dengan forum?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Anda dapat mendaftar gratis melalui halaman registrasi dengan mengisi data dasar dan verifikasi email.
                  </p>
                </div>
                <div className="border-l-4 border-finance-gold pl-4">
                  <h4 className="font-semibold text-finance-navy mb-1">
                    Apakah layanan call center berbayar?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Tidak, semua layanan konsultasi dan bantuan melalui call center kami sepenuhnya gratis.
                  </p>
                </div>
                <div className="border-l-4 border-finance-gold pl-4">
                  <h4 className="font-semibold text-finance-navy mb-1">
                    Bagaimana cara melaporkan konten yang tidak pantas?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Gunakan fitur "Laporkan" di setiap postingan atau hubungi moderator melalui contact form ini.
                  </p>
                </div>
                <div className="border-l-4 border-finance-gold pl-4">
                  <h4 className="font-semibold text-finance-navy mb-1">
                    Apakah informasi pribadi saya aman?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ya, kami menerapkan standar keamanan tinggi dan tidak akan membagikan informasi pribadi Anda kepada pihak ketiga.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Contact Options */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Butuh Bantuan Cepat?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat langsung dengan tim support kami
              </p>
              <Button variant="outline" className="w-full">
                Chat Sekarang
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Telepon Langsung</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hubungi hotline 24 jam kami
              </p>
              <Button variant="outline" className="w-full">
                +62 21 1500 888
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Kirim email untuk bantuan detail
              </p>
              <Button variant="outline" className="w-full">
                info@call-center.id
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactPage