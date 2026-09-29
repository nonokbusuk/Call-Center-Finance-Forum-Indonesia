import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const unreadOnly = searchParams.get('unread') === 'true';

  const messages = await prisma.contactMessage.findMany({
    where: unreadOnly ? { isRead: false } : undefined,
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: 'Nama, email, dan pesan wajib diisi' }, { status: 400 });
  }
  const message = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject || 'Umum',
      message: data.message,
    },
  });
  return NextResponse.json({ ok: true, id: message.id }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  if (!data.id) return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });

  const message = await prisma.contactMessage.update({
    where: { id: data.id },
    data: { isRead: Boolean(data.isRead) },
  });
  return NextResponse.json({ message });
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });

  await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
