import { AlertTriangle, Route as RouteIcon, Users, Navigation } from 'lucide-react';
import type { OverviewStats as OverviewStatsData } from '@/services/analyticsService';
import { StatTile } from '@/components/ui/StatTile';

export function OverviewStats({ stats }: { stats: OverviewStatsData }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatTile label="Total users" value={stats.totalUsers} icon={<Users className="size-5" />} tone="primary" />
      <StatTile
        label="Open incidents"
        value={stats.openIncidents}
        icon={<AlertTriangle className="size-5" />}
        tone="secondary"
      />
      <StatTile label="Active routes" value={stats.totalRoutes} icon={<RouteIcon className="size-5" />} tone="accent" />
      <StatTile label="Trips logged" value={stats.totalTrips} icon={<Navigation className="size-5" />} tone="primary" />
    </div>
  );
}
