import type { TransportMode } from './common';

export interface RouteLine {
  id: string;
  name: string;
  mode: TransportMode;
  color: string;
  stopIds: string[];
  /** Ordered [lat, lng] pairs describing the path on the map. */
  path: [number, number][];
  fareNGN: number;
  frequencyMinutes: number;
  operator: string;
}
