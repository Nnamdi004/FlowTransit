import { useState } from 'react';
import { ChevronDown, Clock, MapPin, Ship, Bus } from 'lucide-react';
import type { RouteLine, Stop } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import { formatNaira } from '@/utils/formatDistance';
import { RouteDetailPanel } from './RouteDetailPanel';

export function RouteCard({ route, stops }: { route: RouteLine; stops: Stop[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card padding="none" hover className="overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={expanded}
      >
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <Badge color={route.mode === 'road' ? 'primary' : 'secondary'}>
              {route.mode === 'road' ? (
                <Bus className="size-3.5" />
              ) : (
                <Ship className="size-3.5" />
              )}
              {route.mode === 'road' ? 'Road / BRT' : 'Ferry'}
            </Badge>
            <span className="text-xs text-ink-subtle">{route.operator}</span>
          </div>
          <p className="font-semibold text-ink">{route.name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {route.stopIds.length} stops
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> every {route.frequencyMinutes} min
            </span>
            <span className="font-medium text-ink">{formatNaira(route.fareNGN)}</span>
          </div>
        </div>
        <ChevronDown
          className={cn('mt-1 size-4 shrink-0 text-ink-subtle transition-transform', expanded && 'rotate-180')}
        />
      </button>
      {expanded && <RouteDetailPanel route={route} stops={stops} />}
    </Card>
  );
}
