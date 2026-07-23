import type { TransportMode } from './common';

export type TripStatus = 'planned' | 'completed' | 'cancelled';

export interface TripOption {
  id: string;
  routeIds: string[];
  durationMinutes: number;
  fareNGN: number;
  transfers: number;
  mode: TransportMode | 'mixed';
}

export interface Trip {
  id: string;
  userId: string;
  originLabel: string;
  destinationLabel: string;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  status: TripStatus;
  selectedOption?: TripOption;
  createdAt: string;
}
