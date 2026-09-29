import { cookies } from 'next/headers';
import { verifySession, AdminSession } from './auth';

export const SESSION_COOKIE = 'admin_session';

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}
