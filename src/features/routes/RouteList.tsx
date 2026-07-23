import type { RouteLine, Stop } from '@/types';
import { RouteCard } from './RouteCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { RouteOff } from 'lucide-react';

interface RouteListProps {
  routes: RouteLine[];
  stops: Stop[];
  isLoading: boolean;
}

export function RouteList({ routes, stops, isLoading }: RouteListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <EmptyState
        icon={<RouteOff className="size-6" />}
        title="No routes match your search"
        description="Try a different keyword or switch tabs to see all road or ferry routes."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} stops={stops} />
      ))}
    </div>
  );
}
