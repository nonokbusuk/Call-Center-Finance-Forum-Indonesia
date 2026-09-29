import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/session';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'latest';

  const threads = await prisma.forumThread.findMany({
    where: {
      AND: [
        category && category !== 'all'
          ? { category: { slug: category } }
          : {},
        search
          ? {
              OR: [
                { title: { contains: search } },
                { content: { contains: search } },
              ],
            }
          : {},
      ],
    },
    include: { category: true, _count: { select: { replies: true } } },
    orderBy:
      sort === 'popular'
        ? [{ isPinned: 'desc' }, { upvotes: 'desc' }]
        : sort === 'views'
        ? [{ isPinned: 'desc' }, { views: 'desc' }]
        : [{ isPinned: 'desc' }, { createdAt: 'desc' }],
  });
  return NextResponse.json({ threads });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  if (!data.title || !data.content || !data.categoryId) {
    return NextResponse.json({ error: 'Judul, konten, dan kategori wajib diisi' }, { status: 400 });
  }

  let slug = slugify(data.title);
  const existing = await prisma.forumThread.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const thread = await prisma.forumThread.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      author: data.author || 'Admin',
      isPinned: Boolean(data.isPinned),
      isLocked: Boolean(data.isLocked),
      categoryId: data.categoryId,
    },
    include: { category: true },
  });
  return NextResponse.json({ thread }, { status: 201 });
}
