'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  MessagesSquare,
  MessageCircle,
  FolderOpen,
  Mail,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/artikel', label: 'Artikel', icon: Newspaper },
  { href: '/admin/threads', label: 'Thread Forum', icon: MessagesSquare },
  { href: '/admin/balasan', label: 'Balasan', icon: MessageCircle },
  { href: '/admin/kategori', label: 'Kategori', icon: FolderOpen },
  { href: '/admin/pesan', label: 'Pesan Kontak', icon: Mail },
];

export default function AdminShell({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-64 flex-col border-r bg-card">
        <div className="p-6 border-b">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-xs text-muted-foreground">Call Center Finance</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Keluar
          </Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between gap-4 border-b px-6 py-4 md:hidden">
          <h1 className="font-bold">Admin Panel</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>
        <div className="hidden md:flex items-center justify-between border-b px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Masuk sebagai <span className="font-medium text-foreground">{name}</span>
          </p>
        </div>
        <nav className="flex overflow-x-auto gap-1 border-b px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
