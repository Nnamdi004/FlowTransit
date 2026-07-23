import type { NewSOSInput, SOSAlert, SOSStatus } from '@/types';
import { apiClient } from './apiClient';

export async function listMySOSAlerts(userId: string): Promise<SOSAlert[]> {
  const { data } = await apiClient.get<SOSAlert[]>('/sos', { params: { userId } });
  return data;
}

export async function listAllSOSAlerts(): Promise<SOSAlert[]> {
  const { data } = await apiClient.get<SOSAlert[]>('/sos');
  return data;
}

export async function sendSOS(input: NewSOSInput, userId: string): Promise<SOSAlert> {
  const { data } = await apiClient.post<SOSAlert>('/sos', { ...input, userId });
  return data;
}

export async function updateSOSStatus(id: string, status: SOSStatus): Promise<SOSAlert> {
  const { data } = await apiClient.patch<SOSAlert>(`/sos/${id}/status`, { status });
  return data;
}
