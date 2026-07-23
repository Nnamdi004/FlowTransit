import type { Trip } from '@/types';
import { apiClient } from './apiClient';

export async function listTrips(userId: string): Promise<Trip[]> {
  const { data } = await apiClient.get<Trip[]>('/trips', { params: { userId } });
  return data;
}

export async function createTrip(payload: Omit<Trip, 'id' | 'createdAt'>): Promise<Trip> {
  const { data } = await apiClient.post<Trip>('/trips', payload);
  return data;
}

export async function updateTrip(id: string, patch: Partial<Trip>): Promise<Trip> {
  const { data } = await apiClient.patch<Trip>(`/trips/${id}`, patch);
  return data;
}
