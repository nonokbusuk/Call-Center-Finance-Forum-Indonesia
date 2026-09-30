import Link from 'next/link';
import { Newspaper, MessagesSquare, MessageCircle, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [articles, threads, replies, messages, unread] = await Promise.all([
    prisma.article.count(),
    prisma.forumThread.count(),
    prisma.forumReply.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const recentArticles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
  const recentThreads = await prisma.forumThread.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { category: true },
  });

  const stats = [
    { label: 'Artikel', value: articles, icon: Newspaper, href: '/admin/artikel' },
    { label: 'Thread Forum', value: threads, icon: MessagesSquare, href: '/admin/threads' },
    { label: 'Balasan', value: replies, icon: MessageCircle, href: '/admin/balasan' },
    { label: `Pesan${unread > 0 ? ` (${unread} baru)` : ''}`, value: messages, icon: Mail, href: '/admin/pesan' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </CardTitle>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Artikel Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentArticles.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{a.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {a.publishDate.toLocaleDateString('id-ID')}
                </span>
              </div>
            ))}
            {recentArticles.length === 0 && (
              <p className="text-sm text-muted-foreground">Belum ada artikel.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thread Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentThreads.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate">{t.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">{t.category.name}</span>
              </div>
            ))}
            {recentThreads.length === 0 && (
              <p className="text-sm text-muted-foreground">Belum ada thread.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
