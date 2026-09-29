import { prisma } from '@/lib/db';
import ReplyManager from '@/components/admin/ReplyManager';

export const dynamic = 'force-dynamic';

export default async function AdminRepliesPage() {
  const replies = await prisma.forumReply.findMany({
    include: { thread: { select: { title: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Moderasi Balasan</h1>
      <ReplyManager
        replies={replies.map((r) => ({
          id: r.id,
          content: r.content,
          author: r.author,
          createdAt: r.createdAt.toISOString(),
          threadTitle: r.thread.title,
        }))}
      />
    </div>
  );
}
