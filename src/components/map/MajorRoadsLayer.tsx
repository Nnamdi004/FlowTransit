import { Polyline, Tooltip } from 'react-leaflet';
import { majorRoads } from '@/mock/geo/majorRoads.geo';

export function MajorRoadsLayer() {
  return (
    <>
      {majorRoads.map((road) => (
        <Polyline
          key={road.id}
          positions={road.path}
          pathOptions={{ color: '#94A3B8', weight: 3, opacity: 0.6 }}
        >
          <Tooltip sticky>{road.name}</Tooltip>
        </Polyline>
      ))}
    </>
  );
}
