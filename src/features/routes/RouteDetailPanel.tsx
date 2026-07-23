import { Link } from 'react-router-dom';
import { MapPinned } from 'lucide-react';
import type { RouteLine, Stop } from '@/types';
import { Button } from '@/components/ui/Button';

export function RouteDetailPanel({ route, stops }: { route: RouteLine; stops: Stop[] }) {
  const routeStops = route.stopIds
    .map((id) => stops.find((s) => s.id === id))
    .filter((s): s is Stop => Boolean(s));

  return (
    <div className="border-t border-ink/5 px-5 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
        Stops on this route
      </p>
      <ol className="relative ml-2 flex flex-col gap-3 border-l-2 border-dashed border-ink/10 pl-5">
        {routeStops.map((stop) => (
          <li key={stop.id} className="relative">
            <span
              className="absolute -left-[1.45rem] top-1 size-2.5 rounded-full"
              style={{ backgroundColor: route.color }}
            />
            <p className="text-sm font-medium text-ink">{stop.name}</p>
            <p className="text-xs text-ink-subtle">{stop.area}</p>
          </li>
        ))}
      </ol>
      <Link to={`/app/map?routeId=${route.id}`} className="mt-4 inline-block">
        <Button variant="outline" size="sm" iconLeft={<MapPinned className="size-4" />}>
          View on map
        </Button>
      </Link>
    </div>
  );
}
