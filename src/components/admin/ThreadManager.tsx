'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Pin, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface AdminThread {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  isPinned: boolean;
  isLocked: boolean;
  views: number;
  upvotes: number;
  replyCount: number;
  categoryId: string;
  categoryName: string;
}

export interface AdminCategoryOption {
  id: string;
  name: string;
}

export default function ThreadManager({
  threads,
  categories,
}: {
  threads: AdminThread[];
  categories: AdminCategoryOption[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminThread | null>(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    categoryId: categories[0]?.id || '',
    isPinned: false,
    isLocked: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: '',
      content: '',
      categoryId: categories[0]?.id || '',
      isPinned: false,
      isLocked: false,
    });
    setError('');
    setOpen(true);
  };

  const openEdit = (t: AdminThread) => {
    setEditing(t);
    setForm({
      title: t.title,
      content: t.content,
      categoryId: t.categoryId,
      isPinned: t.isPinned,
      isLocked: t.isLocked,
    });
    setError('');
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(editing ? `/api/threads/${editing.id}` : '/api/threads', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Gagal menyimpan');
        return;
      }
      setOpen(false);
      router.refresh();
    } catch {
      setError('Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus thread ini? Semua balasan juga akan terhapus.')) return;
    await fetch(`/api/threads/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Thread
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Balasan</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {threads.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="max-w-xs">
                  <p className="truncate font-medium">{t.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    oleh {t.author}
                  </p>
                </TableCell>
                <TableCell>{t.categoryName}</TableCell>
                <TableCell>{t.replyCount}</TableCell>
                <TableCell>{t.views.toLocaleString('id-ID')}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {t.isPinned && (
                      <Badge variant="default">
                        <Pin className="mr-1 h-3 w-3" /> Pin
                      </Badge>
                    )}
                    {t.isLocked && (
                      <Badge variant="secondary">
                        <Lock className="mr-1 h-3 w-3" /> Lock
                      </Badge>
                    )}
                    {!t.isPinned && !t.isLocked && (
                      <span className="text-xs text-muted-foreground">Aktif</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(t.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {threads.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Belum ada thread.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Thread' : 'Tambah Thread'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={form.categoryId}
                onValueChange={(v) => setForm({ ...form, categoryId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Konten</Label>
              <Textarea
                rows={5}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="pinned"
                  checked={form.isPinned}
                  onCheckedChange={(v) => setForm({ ...form, isPinned: v === true })}
                />
                <Label htmlFor="pinned">Pin</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="locked"
                  checked={form.isLocked}
                  onCheckedChange={(v) => setForm({ ...form, isLocked: v === true })}
                />
                <Label htmlFor="locked">Lock</Label>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Batal
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
