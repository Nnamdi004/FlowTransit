import type { PublicUser } from '@/types';
import { apiClient } from './apiClient';

export async function listUsers(): Promise<PublicUser[]> {
  const { data } = await apiClient.get<PublicUser[]>('/admin/users');
  return data;
}

export async function setUserActive(id: string, isActive: boolean): Promise<PublicUser> {
  const { data } = await apiClient.patch<PublicUser>(`/admin/users/${id}`, { isActive });
  return data;
}
