import { ArrowRightLeft, Bus, Route as RouteIcon, Ship } from 'lucide-react';
import type { RouteLine, TripOption } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatMinutes, formatNaira } from '@/utils/formatDistance';

const modeIcon = { road: Bus, ferry: Ship, mixed: RouteIcon };

interface TripOptionCardProps {
  option: TripOption;
  routes: RouteLine[];
  onConfirm: () => void;
  isConfirming?: boolean;
}

export function TripOptionCard({ option, routes, onConfirm, isConfirming }: TripOptionCardProps) {
  const legs = option.routeIds
    .map((id) => routes.find((r) => r.id === id))
    .filter((r): r is RouteLine => Boolean(r));
  const Icon = modeIcon[option.mode];

  return (
    <Card hover className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <Icon className="size-5" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-ink">{formatMinutes(option.durationMinutes)}</p>
            <span className="text-ink-subtle">·</span>
            <p className="text-sm text-ink-muted">{formatNaira(option.fareNGN)}</p>
            {option.transfers > 0 && (
              <Badge color="neutral">
                <ArrowRightLeft className="size-3" /> {option.transfers} transfer{option.transfers > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-subtle">
            {legs.map((leg) => leg.name).join(' → ')}
          </p>
        </div>
      </div>
      <Button size="sm" onClick={onConfirm} isLoading={isConfirming} className="shrink-0">
        Confirm trip
      </Button>
    </Card>
  );
}
