import './globals.css';

export const metadata = {
  title: {
    default: 'Call Center Finance Indonesia',
    template: '%s | Call Center Finance Indonesia',
  },
  description:
    'Platform forum terdepan untuk diskusi dan publikasi tentang layanan keuangan di Indonesia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
