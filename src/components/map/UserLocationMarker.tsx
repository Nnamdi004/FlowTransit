import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const userIcon = divIcon({
  html: renderToStaticMarkup(
    <span className="relative flex size-4">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-60" />
      <span className="relative inline-flex size-4 rounded-full border-2 border-white bg-primary-700 shadow-soft" />
    </span>,
  ),
  className: 'ft-div-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface UserLocationMarkerProps {
  position: [number, number];
  label?: string;
}

export function UserLocationMarker({ position, label = 'Your location' }: UserLocationMarkerProps) {
  return (
    <Marker position={position} icon={userIcon}>
      <Popup>{label} (mock)</Popup>
    </Marker>
  );
}
