import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [articles, threads, replies, categories, messages, unreadMessages] = await Promise.all([
    prisma.article.count(),
    prisma.forumThread.count(),
    prisma.forumReply.count(),
    prisma.forumCategory.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return NextResponse.json({
    stats: { articles, threads, replies, categories, messages, unreadMessages },
  });
}
