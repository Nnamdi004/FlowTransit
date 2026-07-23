import type { Incident, IncidentStatus, NewIncidentInput, TransportMode } from '@/types';
import { apiClient } from './apiClient';

export async function listIncidents(params?: {
  status?: IncidentStatus;
  mode?: TransportMode;
}): Promise<Incident[]> {
  const { data } = await apiClient.get<Incident[]>('/incidents', { params });
  return data;
}

export async function createIncident(
  payload: NewIncidentInput,
  reporterId: string,
): Promise<Incident> {
  const { data } = await apiClient.post<Incident>('/incidents', { ...payload, reporterId });
  return data;
}

export async function updateIncidentStatus(
  id: string,
  status: IncidentStatus,
): Promise<Incident> {
  const { data } = await apiClient.patch<Incident>(`/incidents/${id}/status`, { status });
  return data;
}
