'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, MailOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessageManager({ messages }: { messages: AdminMessage[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleRead = async (m: AdminMessage) => {
    await fetch('/api/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: m.id, isRead: !m.isRead }),
    });
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus pesan ini?')) return;
    await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pengirim</TableHead>
            <TableHead>Subjek</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((m) => (
            <TableRow
              key={m.id}
              className="cursor-pointer"
              onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            >
              <TableCell>
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
                {expanded === m.id && (
                  <p className="mt-2 text-sm whitespace-pre-wrap">{m.message}</p>
                )}
              </TableCell>
              <TableCell>{m.subject}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(m.createdAt).toLocaleString('id-ID')}
              </TableCell>
              <TableCell>
                <Badge variant={m.isRead ? 'secondary' : 'default'}>
                  {m.isRead ? 'Dibaca' : 'Baru'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRead(m);
                    }}
                  >
                    {m.isRead ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <MailOpen className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(m.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {messages.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Belum ada pesan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
