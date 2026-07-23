import { Marker, Popup } from 'react-leaflet';
import { Bus, Ship } from 'lucide-react';
import type { Stop } from '@/types';
import { createMarkerIcon } from './markerIcon';

const roadIcon = createMarkerIcon(<Bus size={15} />, '#1D4ED8');
const ferryIcon = createMarkerIcon(<Ship size={15} />, '#0E7490');

export function StopMarker({ stop }: { stop: Stop }) {
  return (
    <Marker position={[stop.lat, stop.lng]} icon={stop.mode === 'road' ? roadIcon : ferryIcon}>
      <Popup>
        <p className="font-medium text-ink">{stop.name}</p>
        <p className="text-xs capitalize text-ink-muted">{stop.mode} stop · {stop.area}</p>
      </Popup>
    </Marker>
  );
}
