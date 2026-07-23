export type TransportMode = 'road' | 'ferry';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface ApiListParams {
  page?: number;
  pageSize?: number;
}
