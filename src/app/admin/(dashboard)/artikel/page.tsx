import { prisma } from '@/lib/db';
import ArticleManager from '@/components/admin/ArticleManager';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishDate: 'desc' },
  });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kelola Artikel</h1>
      <ArticleManager
        articles={articles.map((a) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          content: a.content,
          author: a.author,
          category: a.category,
          tags: a.tags,
          readTime: a.readTime,
          views: a.views,
          image: a.image,
          published: a.published,
        }))}
      />
    </div>
  );
}
