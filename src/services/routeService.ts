import type { RouteLine } from '@/types';
import { apiClient } from './apiClient';

export async function listRoutes(): Promise<RouteLine[]> {
  const { data } = await apiClient.get<RouteLine[]>('/routes');
  return data;
}

export async function getRoute(id: string): Promise<RouteLine> {
  const { data } = await apiClient.get<RouteLine>(`/routes/${id}`);
  return data;
}

export async function createRoute(payload: Omit<RouteLine, 'id'>): Promise<RouteLine> {
  const { data } = await apiClient.post<RouteLine>('/routes', payload);
  return data;
}

export async function updateRoute(id: string, patch: Partial<RouteLine>): Promise<RouteLine> {
  const { data } = await apiClient.patch<RouteLine>(`/routes/${id}`, patch);
  return data;
}

export async function deleteRoute(id: string): Promise<void> {
  await apiClient.delete(`/routes/${id}`);
}
