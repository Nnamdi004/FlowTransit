import type { PublicUser, Session } from '@/types';
import { apiClient } from './apiClient';
import { readJSON, writeJSON, removeKey } from '@/utils/storage';

const SESSION_KEY = 'flowtransit_session';

interface StoredSession {
  session: Session;
  user: PublicUser;
}

export interface AuthResult {
  user: PublicUser;
  session: Session;
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const { data } = await apiClient.post<AuthResult>('/auth/login', { email, password });
  writeJSON<StoredSession>(SESSION_KEY, data);
  return data;
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  const { data } = await apiClient.post<AuthResult>('/auth/register', input);
  writeJSON<StoredSession>(SESSION_KEY, data);
  return data;
}

export function logout(): void {
  removeKey(SESSION_KEY);
}

export async function updateProfile(
  id: string,
  patch: { name?: string; phone?: string; avatarUrl?: string },
): Promise<PublicUser> {
  const { data } = await apiClient.patch<PublicUser>(`/users/${id}`, patch);
  const stored = readJSON<StoredSession>(SESSION_KEY);
  if (stored) writeJSON<StoredSession>(SESSION_KEY, { ...stored, user: data });
  return data;
}

export async function forgotPassword(email: string): Promise<{ demoResetToken?: string }> {
  const { data } = await apiClient.post<{ success: boolean; demoResetToken?: string }>(
    '/auth/forgot-password',
    { email },
  );
  return { demoResetToken: data.demoResetToken };
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await apiClient.post('/auth/reset-password', { token, newPassword });
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  await apiClient.post('/auth/change-password', { userId, currentPassword, newPassword });
}

export async function getSession(): Promise<AuthResult | null> {
  const stored = readJSON<StoredSession>(SESSION_KEY);
  if (!stored) return null;
  if (new Date(stored.session.expiresAt).getTime() < Date.now()) {
    removeKey(SESSION_KEY);
    return null;
  }
  try {
    const { data } = await apiClient.get<{ user: PublicUser }>(`/auth/me/${stored.session.userId}`);
    const refreshed: StoredSession = { session: stored.session, user: data.user };
    writeJSON<StoredSession>(SESSION_KEY, refreshed);
    return refreshed;
  } catch {
    removeKey(SESSION_KEY);
    return null;
  }
}
