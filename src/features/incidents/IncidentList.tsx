import { ShieldAlert } from 'lucide-react';
import type { Incident } from '@/types';
import { IncidentCard } from './IncidentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';

interface IncidentListProps {
  incidents: Incident[];
  isLoading: boolean;
}

export function IncidentList({ incidents, isLoading }: IncidentListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <EmptyState
        icon={<ShieldAlert className="size-6" />}
        title="No incidents reported"
        description="Nothing to show for this filter right now."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
