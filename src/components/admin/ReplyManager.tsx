'use client';

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
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

export interface AdminReply {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  threadTitle: string;
}

export default function ReplyManager({ replies }: { replies: AdminReply[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus balasan ini?')) return;
    await fetch(`/api/replies?id=${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Balasan</TableHead>
            <TableHead>Thread</TableHead>
            <TableHead>Penulis</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {replies.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="max-w-sm">
                <p className="line-clamp-2">{r.content}</p>
              </TableCell>
              <TableCell className="max-w-xs">
                <p className="truncate text-sm">{r.threadTitle}</p>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{r.author}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(r.createdAt).toLocaleString('id-ID')}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {replies.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Belum ada balasan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
