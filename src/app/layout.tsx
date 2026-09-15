import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Call Center Finance Forum Indonesia',
    template: '%s | Call Center Finance Indonesia',
  },
  description:
    'Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di Indonesia.',
  keywords: ['forum keuangan', 'fintech', 'investasi', 'perbankan', 'asuransi', 'OJK', 'pinjaman online'],
  metadataBase: new URL('https://www.call-center.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.call-center.id/',
    siteName: 'Call Center Finance Indonesia',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#1E3A8A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
