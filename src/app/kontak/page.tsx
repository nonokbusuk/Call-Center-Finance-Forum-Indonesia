import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Kontak Kami | Call Center Finance Indonesia',
  description: 'Hubungi kami untuk pertanyaan, saran, atau kerjasama. Kami siap membantu Anda dalam berbagai kebutuhan informasi keuangan.',
  keywords: ['kontak', 'hubungi kami', 'customer service', 'call center keuangan', 'dukungan pelanggan'],
  alternates: { canonical: 'https://www.call-center.id/kontak/' },
  openGraph: {
    title: 'Kontak Kami | Call Center Finance Indonesia',
    description: 'Hubungi kami untuk pertanyaan, saran, atau kerjasama',
    url: 'https://www.call-center.id/kontak/',
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
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
      "name": "Kontak",
      "item": "https://www.call-center.id/kontak/",
    },
  ],
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Call Center Finance Indonesia",
  "url": "https://www.call-center.id",
  "logo": "https://cdn-ai.onspace.ai/onspace/project/image/2hGG6P7tn8CTHN87f9mtSp/call-center.png",
  "description": "Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di Indonesia",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Sudirman No. 1",
    "addressLocality": "Jakarta",
    "addressRegion": "DKI Jakarta",
    "postalCode": "10220",
    "addressCountry": "ID",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62 21 1500 888",
    "contactType": "customer service",
    "email": "info@call-center.id",
    "availableLanguage": ["Indonesian"],
  },
  "sameAs": [
    "https://www.facebook.com/callcenterid",
    "https://twitter.com/callcenterid",
    "https://www.instagram.com/callcenterid",
    "https://www.linkedin.com/company/callcenterid",
  ],
};

// WebPage Schema
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Kontak Kami",
  "url": "https://www.call-center.id/kontak/",
  "description": "Hubungi kami untuk pertanyaan, saran, atau kerjasama",
  "publisher": {
    "@type": "Organization",
    "name": "Call Center Finance Indonesia",
  },
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa lama waktu respon untuk pertanyaan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kami berusaha merespons semua pertanyaan dalam waktu 24-48 jam kerja.",
      },
    },
    {
      "@type": "Question",
      "name": "Apakah ada biaya untuk menggunakan layanan ini?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tidak, semua layanan kami sepenuhnya gratis untuk semua pengguna.",
      },
    },
  ],
};

export default function ContactPage() {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Kontak Kami</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hubungi kami untuk pertanyaan, saran, atau kerjasama. Kami siap membantu Anda dalam berbagai kebutuhan informasi keuangan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                <CardDescription>
                  Isi formulir di bawah ini untuk menghubungi kami
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan alamat email Anda"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Masukkan nomor telepon Anda"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Masukkan subjek pesan"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Office Information */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-finance-gold" />
                    Kantor Pusat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic">
                    <p className="text-lg font-medium">Call Center Finance Indonesia</p>
                    <p className="text-muted-foreground">
                      Jl. Sudirman No. 1, Jakarta Selatan
                    </p>
                    <p className="text-muted-foreground">DKI Jakarta, 10220</p>
                    <p className="text-muted-foreground">Indonesia</p>
                  </address>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Phone className="h-6 w-6 text-finance-gold" />
                    Kontak Kami
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-finance-gold/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-finance-gold" />
                      </div>
                      <div>
                        <p className="font-medium">Telepon</p>
                        <p className="text-muted-foreground">+62 21 1500 888</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-finance-gold/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-finance-gold" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@call-center.id</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-finance-gold/10 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-finance-gold" />
                      </div>
                      <div>
                        <p className="font-medium">Jam Kerja</p>
                        <p className="text-muted-foreground">
                          Senin - Jumat: 09:00 - 17:00 WIB
                        </p>
                        <p className="text-muted-foreground">
                          Sabtu: 09:00 - 14:00 WIB
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Facebook className="h-6 w-6 text-finance-gold" />
                    Media Sosial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/callcenterid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-finance-gold/10 rounded-lg hover:bg-finance-gold/20 transition-colors"
                    >
                      <Facebook className="h-6 w-6 text-finance-gold" />
                    </a>
                    <a
                      href="https://twitter.com/callcenterid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-finance-gold/10 rounded-lg hover:bg-finance-gold/20 transition-colors"
                    >
                      <Twitter className="h-6 w-6 text-finance-gold" />
                    </a>
                    <a
                      href="https://www.instagram.com/callcenterid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-finance-gold/10 rounded-lg hover:bg-finance-gold/20 transition-colors"
                    >
                      <Instagram className="h-6 w-6 text-finance-gold" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/callcenterid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-finance-gold/10 rounded-lg hover:bg-finance-gold/20 transition-colors"
                    >
                      <Linkedin className="h-6 w-6 text-finance-gold" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Lokasi Kami</CardTitle>
                <CardDescription>
                  Temukan lokasi kantor kami
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center text-muted-foreground">
                  <p>Peta lokasi kantor akan ditampilkan di sini</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  <MapPin className="h-4 w-4 inline mx-1" />
                  Jl. Sudirman No. 1, Jakarta Selatan, DKI Jakarta, 10220, Indonesia
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
