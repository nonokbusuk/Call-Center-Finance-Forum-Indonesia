import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/session';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = await prisma.article.findUnique({ where: { id: params.id } });
  if (!article) return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
  return NextResponse.json({ article });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const article = await prisma.article.update({
    where: { id: params.id },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
      readTime: Number(data.readTime) || 5,
      image: data.image,
      published: data.published,
    },
  });
  return NextResponse.json({ article });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.article.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
