import { ArrowRight, Ship, Bus, Route as RouteIcon } from 'lucide-react';
import type { Trip } from '@/types';

const modeIcon = {
  road: Bus,
  ferry: Ship,
  mixed: RouteIcon,
};

export function TripHistoryRow({ trip }: { trip: Trip }) {
  const Icon = modeIcon[trip.selectedOption?.mode ?? 'mixed'];

  return (
    <div className="flex items-center gap-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 truncate text-sm font-medium text-ink">
          {trip.originLabel} <ArrowRight className="size-3.5 shrink-0 text-ink-subtle" /> {trip.destinationLabel}
        </p>
      </div>
    </div>
  );
}
