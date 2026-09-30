import { prisma } from '@/lib/db';
import MessageManager from '@/components/admin/MessageManager';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pesan Kontak</h1>
      <MessageManager
        messages={messages.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          subject: m.subject,
          message: m.message,
          isRead: m.isRead,
          createdAt: m.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
