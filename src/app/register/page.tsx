import { Metadata } from 'next';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Daftar Akun Baru | Call Center Finance Indonesia',
  description: 'Buat akun baru untuk bergabung dengan forum diskusi keuangan terbesar di Indonesia.',
  keywords: ['daftar', 'registrasi', 'buat akun', 'forum keuangan', 'pendaftaran'],
  alternates: { canonical: 'https://www.call-center.id/register/' },
  robots: {
    index: false,
    follow: false,
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
      "name": "Daftar",
      "item": "https://www.call-center.id/register/",
    },
  ],
};

// WebPage Schema
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Daftar Akun Baru",
  "url": "https://www.call-center.id/register/",
  "description": "Buat akun baru untuk bergabung dengan forum diskusi keuangan",
  "publisher": {
    "@type": "Organization",
    "name": "Call Center Finance Indonesia",
  },
};

// Benefits list
const benefits = [
  { icon: "💬", text: "Berpartisipasi dalam diskusi keuangan" },
  { icon: "📝", text: "Membuat thread dan berkomentar" },
  { icon: "📊", text: "Mengakses artikel premium" },
  { icon: "📧", text: "Menerima newsletter eksklusif" },
  { icon: "🏆", text: "Mendapatkan badge dan achievement" },
];

export default function RegisterPage() {
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
          {/* Back to Home */}
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Registration Form */}
            <Card className="p-6">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <User className="h-10 w-10 text-finance-gold" />
                </div>
                <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
                <CardDescription>
                  Bergabung dengan forum keuangan terbesar di Indonesia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nama Depan</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Masukkan nama depan"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nama Belakang</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Masukkan nama belakang"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan alamat email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Pilih username"
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Username akan digunakan untuk login dan ditampilkan di forum
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Buat password"
                        className="pl-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground space-x-2">
                      <span>✓ Minimal 8 karakter</span>
                      <span>✓ Mengandung huruf besar</span>
                      <span>✓ Mengandung angka</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Konfirmasi password"
                        className="pl-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="terms" className="rounded border-gray-300 mt-1" required />
                      <Label htmlFor="terms" className="text-sm font-normal">
                        Saya setuju dengan{' '}
                        <Link href="/ketentuan-layanan/" className="text-primary hover:underline">
                          Ketentuan Layanan
                        </Link>{' '}
                        dan{' '}
                        <Link href="/kebijakan-privasi/" className="text-primary hover:underline">
                          Kebijakan Privasi
                        </Link>
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                    Daftar Sekarang
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <p className="text-muted-foreground">
                    Sudah punya akun?{' '}
                    <Link href="/login/" className="text-primary hover:underline font-medium">
                      Masuk di sini
                    </Link>
                  </p>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">atau daftar dengan</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.75-.87 1.12-2.15 1.65-3.67 1.19.72-.17 1.33-.64 1.77-1.28-.55-.19-1.16-.21-1.75-.14-.85.12-1.76.19-2.65.32.88.68 1.54 1.51 2.12 2.45-1.45 1.08-3.17.83-4.65.92-.35 1.72-.92 3.25-1.74 4.65-1.17.19-2.39.06-3.55-.35"
                        />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="p-6 border-finance-gold/20 bg-finance-gold/5">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Keuntungan Bergabung</CardTitle>
                <CardDescription>
                  Apa yang Anda dapatkan dengan mendaftar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <span className="text-2xl">{benefit.icon}</span>
                      <span className="text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-finance-gold/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5 text-finance-gold" />
                    <span className="font-medium">100% Gratis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tidak ada biaya pendaftaran atau berlangganan
                  </p>
                </div>

                <div className="mt-4 p-4 bg-finance-gold/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5 text-finance-gold" />
                    <span className="font-medium">Aman & Terpercaya</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Data Anda dilindungi dengan sistem keamanan terbaru
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
