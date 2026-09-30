import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'change-me-in-production'
);

export const SESSION_COOKIE_NAME = 'admin_session';

export interface AdminSession {
  id: string;
  username: string;
  name: string;
}

export async function signSession(payload: AdminSession): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.id !== 'string' || typeof payload.username !== 'string') {
      return null;
    }
    return {
      id: payload.id as string,
      username: payload.username as string,
      name: (payload.name as string) || '',
    };
  } catch {
    return null;
  }
}
