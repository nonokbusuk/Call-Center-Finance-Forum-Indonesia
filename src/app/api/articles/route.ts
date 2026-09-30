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

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { publishDate: 'desc' },
  });
  return NextResponse.json({ articles });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  if (!data.title || !data.content) {
    return NextResponse.json({ error: 'Judul dan konten wajib diisi' }, { status: 400 });
  }

  let slug = data.slug ? slugify(data.slug) : slugify(data.title);
  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const article = await prisma.article.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt || '',
      content: data.content,
      author: data.author || 'Tim Redaksi',
      category: data.category || 'Fintech',
      tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
      readTime: Number(data.readTime) || 5,
      image: data.image || null,
      published: data.published !== false,
      publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
    },
  });
  return NextResponse.json({ article }, { status: 201 });
}
