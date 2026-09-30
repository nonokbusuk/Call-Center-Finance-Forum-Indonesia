import { prisma } from '@/lib/db';
import CategoryManager from '@/components/admin/CategoryManager';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await prisma.forumCategory.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { threads: true } } },
  });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kelola Kategori Forum</h1>
      <CategoryManager
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          order: c.order,
          threadCount: c._count.threads,
        }))}
      />
    </div>
  );
}
