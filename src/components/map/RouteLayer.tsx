import { Polyline, Popup } from 'react-leaflet';
import type { RouteLine } from '@/types';
import { formatNaira } from '@/utils/formatDistance';

interface RouteLayerProps {
  route: RouteLine;
  highlighted?: boolean;
}

export function RouteLayer({ route, highlighted = false }: RouteLayerProps) {
  return (
    <Polyline
      positions={route.path}
      pathOptions={{
        color: route.color,
        weight: highlighted ? 6 : 4,
        opacity: highlighted ? 1 : 0.75,
        dashArray: route.mode === 'ferry' ? '2 10' : undefined,
      }}
    >
      <Popup>
        <p className="font-medium text-ink">{route.name}</p>
        <p className="text-xs text-ink-muted">{route.operator}</p>
        <p className="mt-1 text-xs text-ink-muted">
          {formatNaira(route.fareNGN)} · every {route.frequencyMinutes} min
        </p>
      </Popup>
    </Polyline>
  );
}
