import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const cats = await prisma.forumCategory.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { threads: true } } },
  });
  return NextResponse.json({ categories: cats });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  if (!data.name) return NextResponse.json({ error: 'Nama wajib diisi' }, { status: 400 });

  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const category = await prisma.forumCategory.create({
    data: { name: data.name, slug, icon: data.icon || null, order: Number(data.order) || 0 },
  });
  return NextResponse.json({ category }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  if (!data.id) return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });

  const category = await prisma.forumCategory.update({
    where: { id: data.id },
    data: { name: data.name, slug: data.slug, order: Number(data.order) || 0 },
  });
  return NextResponse.json({ category });
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });

  await prisma.forumCategory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
