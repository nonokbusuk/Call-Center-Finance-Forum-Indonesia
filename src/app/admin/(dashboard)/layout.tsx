import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import AdminShell from '@/components/admin/AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return <AdminShell name={session.name || session.username}>{children}</AdminShell>;
}
