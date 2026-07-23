import type { ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { cn } from '@/utils/cn';

interface MapViewProps {
  center: LatLngExpression;
  zoom?: number;
  children?: ReactNode;
  className?: string;
}

export function MapView({ center, zoom = 12, children, className }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className={cn('z-0 h-full w-full rounded-2xl', className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
