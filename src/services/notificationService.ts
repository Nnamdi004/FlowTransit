import type { AppNotification } from '@/types';
import { apiClient } from './apiClient';

export async function listNotifications(userId: string): Promise<AppNotification[]> {
  const { data } = await apiClient.get<AppNotification[]>('/notifications', { params: { userId } });
  return data;
}

export async function markNotificationRead(id: string): Promise<AppNotification> {
  const { data } = await apiClient.patch<AppNotification>(`/notifications/${id}/read`);
  return data;
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  await apiClient.post(`/notifications/read-all/${userId}`);
}
