import 'server-only';
import 'dotenv/config';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import { cache } from 'react';

interface JWTPayload {
  userId: number;
  username: string;
  [key: string]: string | number | boolean | null | undefined;
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '2d';

// Generate jwt token
async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

// Verify jwt token
async function verifyJWTToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);

    return payload as JWTPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Creating session
export async function createSession(userId: number, username: string) {
  try {
    const token = await generateJWT({ userId, username });
    if (!token) {
      return false;
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: 'fur_legged_user_token',
      value: token,
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day duration
      path: '/',
      sameSite: 'lax',
    });
  } catch (error) {
    console.error('Error creating session', error);
    return false;
  }
}

// Delete user current session
export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('fur_legged_user_token');
    return true;
  } catch (error) {
    console.error('Error deleting session', error);
    return false;
  }
}

// Get Session
export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('fur_legged_user_token')?.value;

    if (!token) {
      return null;
    }

    const sessionPayload = await verifyJWTToken(token);

    return sessionPayload
      ? { userId: sessionPayload.userId, username: sessionPayload.username }
      : null;
  } catch (error) {
    console.error('Error fetching session', error);
    return false;
  }
});
