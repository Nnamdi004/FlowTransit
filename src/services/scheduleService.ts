import type { ScheduleEntry } from '@/types';
import { apiClient } from './apiClient';

export async function listSchedules(routeId?: string): Promise<ScheduleEntry[]> {
  const { data } = await apiClient.get<ScheduleEntry[]>('/schedules', { params: { routeId } });
  return data;
}
