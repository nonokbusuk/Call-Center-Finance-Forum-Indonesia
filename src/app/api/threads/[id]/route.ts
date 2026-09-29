import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/session';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const thread = await prisma.forumThread.update({
    where: { id: params.id },
    data: {
      title: data.title,
      content: data.content,
      isPinned: Boolean(data.isPinned),
      isLocked: Boolean(data.isLocked),
      categoryId: data.categoryId,
    },
    include: { category: true },
  });
  return NextResponse.json({ thread });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.forumThread.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
