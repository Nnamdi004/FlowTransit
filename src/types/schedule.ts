import type { TransportMode } from './common';

export type ScheduleStatus = 'on-time' | 'delayed' | 'cancelled';

export interface ScheduleEntry {
  id: string;
  routeId: string;
  mode: TransportMode;
  departureTime: string; // "HH:mm", 24-hour
  daysOfWeek: number[]; // 0=Sunday .. 6=Saturday
  vehicleName: string;
  capacity: number;
  status: ScheduleStatus;
}
