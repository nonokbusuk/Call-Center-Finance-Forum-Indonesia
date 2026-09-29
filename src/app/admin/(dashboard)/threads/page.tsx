import { prisma } from '@/lib/db';
import ThreadManager from '@/components/admin/ThreadManager';

export const dynamic = 'force-dynamic';

export default async function AdminThreadsPage() {
  const [threads, categories] = await Promise.all([
    prisma.forumThread.findMany({
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      include: { category: true, _count: { select: { replies: true } } },
    }),
    prisma.forumCategory.findMany({ orderBy: { order: 'asc' } }),
  ]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kelola Thread Forum</h1>
      <ThreadManager
        threads={threads.map((t) => ({
          id: t.id,
          title: t.title,
          slug: t.slug,
          content: t.content,
          author: t.author,
          isPinned: t.isPinned,
          isLocked: t.isLocked,
          views: t.views,
          upvotes: t.upvotes,
          replyCount: t._count.replies,
          categoryId: t.categoryId,
          categoryName: t.category.name,
        }))}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
