import type { Stop } from '@/types';
import { apiClient } from './apiClient';

export async function listStops(): Promise<Stop[]> {
  const { data } = await apiClient.get<Stop[]>('/stops');
  return data;
}
