import { Metadata } from 'next';
import { ArrowLeft, Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Login | Call Center Finance Indonesia',
  description: 'Masuk ke akun Anda untuk mengakses semua fitur forum diskusi keuangan.',
  keywords: ['login', 'masuk', 'akun', 'forum keuangan', 'authentikasi'],
  alternates: { canonical: 'https://www.call-center.id/login/' },
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
      "name": "Login",
      "item": "https://www.call-center.id/login/",
    },
  ],
};

// WebPage Schema
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Login",
  "url": "https://www.call-center.id/login/",
  "description": "Masuk ke akun Anda untuk mengakses semua fitur forum",
  "publisher": {
    "@type": "Organization",
    "name": "Call Center Finance Indonesia",
  },
};

export default function LoginPage() {
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

          <div className="max-w-md mx-auto">
            {/* Login Card */}
            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <User className="h-10 w-10 text-finance-gold" />
                </div>
                <CardTitle className="text-2xl">Masuk ke Akun Anda</CardTitle>
                <CardDescription>
                  Silahkan masuk dengan email dan password Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
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
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Masukkan password"
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

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="remember" className="rounded border-gray-300" />
                      <Label htmlFor="remember" className="text-sm font-normal">
                        Ingat saya
                      </Label>
                    </div>
                    <Link href="/forgot-password/" className="text-primary hover:underline text-sm">
                      Lupa password?
                    </Link>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-finance-gold hover:bg-finance-gold/90 text-finance-navy">
                    Masuk
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <p className="text-muted-foreground">
                    Belum punya akun?{' '}
                    <Link href="/register/" className="text-primary hover:underline font-medium">
                      Daftar Sekarang
                    </Link>
                  </p>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">atau</span>
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

            {/* Info Card */}
            <Card className="border-finance-gold/20 bg-finance-gold/5">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Lock className="h-8 w-8 text-finance-gold" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Keamanan Akun Anda</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Kami menjaga kerahasiaan dan keamanan data Anda. Pastikan untuk tidak membagikan password Anda kepada siapa pun.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>✓ Enkripsi data SSL 256-bit</p>
                  <p>✓ Verifikasi dua langkah (2FA)</p>
                  <p>✓ Perlindungan dari serangan DDoS</p>
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
