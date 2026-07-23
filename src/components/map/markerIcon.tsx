import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import type { ReactElement } from 'react';

export function createMarkerIcon(icon: ReactElement, color: string) {
  const html = renderToStaticMarkup(
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: '9999px',
        background: color,
        color: 'white',
        boxShadow: '0 4px 10px -2px rgba(15,23,42,0.35)',
        border: '2px solid white',
      }}
    >
      {icon}
    </span>,
  );

  return divIcon({
    html,
    className: 'ft-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
}
