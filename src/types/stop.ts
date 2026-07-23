import type { TransportMode } from './common';

export interface Stop {
  id: string;
  name: string;
  mode: TransportMode;
  lat: number;
  lng: number;
  area: string;
}
