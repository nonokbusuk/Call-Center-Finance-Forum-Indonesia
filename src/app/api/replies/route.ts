import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get('threadId');

  const replies = await prisma.forumReply.findMany({
    where: threadId ? { threadId } : undefined,
    include: { thread: { select: { title: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ replies });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  if (!data.threadId || !data.content) {
    return NextResponse.json({ error: 'Thread dan konten wajib diisi' }, { status: 400 });
  }
  const reply = await prisma.forumReply.create({
    data: {
      content: data.content,
      author: data.author || session.name || 'Admin',
      threadId: data.threadId,
    },
  });
  return NextResponse.json({ reply }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });

  await prisma.forumReply.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
