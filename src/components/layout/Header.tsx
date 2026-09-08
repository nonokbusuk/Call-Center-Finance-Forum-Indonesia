"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun, User, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTheme } from '../ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Forum', href: '/forum/' },
    { name: 'Artikel', href: '/artikel/' },
    { name: 'OJK & Regulasi', href: '/ojk-regulasi/' },
    { name: 'Edukasi Keuangan', href: '/edukasi-keuangan/' },
    { name: 'Kontak', href: '/kontak/' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://cdn-ai.onspace.ai/onspace/project/image/2hGG6P7tn8CTHN87f9mtSp/call-center.png"
              alt="Call Center Finance Indonesia"
              className="h-10 w-auto"
              loading="lazy"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold finance-text-gradient">call-center.id</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Cari topik..."
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* User Menu */}
            <Link href="/login/" passHref legacyBehavior>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background py-4 animate-slide-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <div className="px-2 pt-2">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Cari topik..."
                    className="pl-10"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
