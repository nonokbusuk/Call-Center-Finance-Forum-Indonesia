'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: subject || (phone ? `[${phone}] Umum` : 'Umum'),
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
        <CardDescription>Isi formulir di bawah ini untuk menghubungi kami</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'sent' ? (
          <div className="space-y-4 text-center py-8">
            <p className="text-lg font-medium text-green-600">
              Pesan Anda telah terkirim. Terima kasih!
            </p>
            <Button variant="outline" onClick={() => setStatus('idle')}>
              Kirim pesan lain
            </Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan alamat email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Masukkan nomor telepon Anda"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subjek</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Masukkan subjek pesan"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea
                id="message"
                placeholder="Tulis pesan Anda di sini..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            {status === 'error' && (
              <p className="text-sm text-destructive">
                Gagal mengirim pesan. Silakan coba lagi.
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-finance-gold hover:bg-finance-gold/90 text-finance-navy"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
