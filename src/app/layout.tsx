import type { Metadata } from 'next';
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
    'Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di Indonesia. Forum, artikel, edukasi keuangan, dan informasi OJK & regulasi.',
  keywords: [
    'forum keuangan',
    'call center finance',
    'keuangan indonesia',
    'OJK',
    'investasi',
    'fintech',
    'perbankan',
  ],
  authors: [{ name: 'Call Center Finance Indonesia' }],
  creator: 'Call Center Finance Indonesia',
  metadataBase: new URL('https://www.call-center.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.call-center.id',
    siteName: 'Call Center Finance Indonesia',
    title: 'Call Center Finance Forum Indonesia',
    description:
      'Forum diskusi, artikel, dan edukasi keuangan terdepan di Indonesia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Call Center Finance Forum Indonesia',
    description:
      'Forum diskusi, artikel, dan edukasi keuangan terdepan di Indonesia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('vite-ui-theme') || 'system';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (stored === 'system' && prefersDark);
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
