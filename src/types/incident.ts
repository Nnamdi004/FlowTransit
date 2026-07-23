import type { TransportMode } from './common';

export type IncidentStatus = 'open' | 'investigating' | 'resolved';
export type IncidentSeverity = 'low' | 'medium' | 'high';

export interface Incident {
  id: string;
  reporterId: string;
  reporterName: string;
  mode: TransportMode;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  lat: number;
  lng: number;
  area: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewIncidentInput {
  mode: TransportMode;
  title: string;
  description: string;
  severity: IncidentSeverity;
  lat: number;
  lng: number;
  area: string;
  imageUrl?: string;
}
