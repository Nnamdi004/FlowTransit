import { useEffect, useState } from 'react';
import * as analyticsService from '@/services/analyticsService';
import type { Incident } from '@/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { OverviewStats } from '@/features/admin/analytics/OverviewStats';
import { TrendLineChart } from '@/components/charts/TrendLineChart';
import { UserGrowthChart } from '@/components/charts/UserGrowthChart';
import { RouteUsageBarChart } from '@/components/charts/RouteUsageBarChart';
import { IncidentStatusDonut } from '@/components/charts/IncidentStatusDonut';
import { TripsPerDayChart } from '@/components/charts/TripsPerDayChart';
import { IncidentCategoryChart } from '@/components/charts/IncidentCategoryChart';

export function AdminDashboardPage() {
  const [stats, setStats] = useState<analyticsService.OverviewStats | null>(null);
  const [tripsPerDay, setTripsPerDay] = useState<analyticsService.TrendPoint[]>([]);
  const [incidentTrend, setIncidentTrend] = useState<analyticsService.TrendPoint[]>([]);
  const [userGrowth, setUserGrowth] = useState<analyticsService.TrendPoint[]>([]);
  const [routeUsage, setRouteUsage] = useState<analyticsService.RouteUsagePoint[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState<{ status: Incident['status']; count: number }[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<analyticsService.IncidentCategoryPoint[]>([]);

  useEffect(() => {
    analyticsService.getOverviewStats().then(setStats);
    analyticsService.getTripsPerDay().then(setTripsPerDay);
    analyticsService.getIncidentTrend().then(setIncidentTrend);
    analyticsService.getUserGrowth().then(setUserGrowth);
    analyticsService.getRouteUsage().then(setRouteUsage);
    analyticsService.getIncidentStatusBreakdown().then(setStatusBreakdown);
    analyticsService.getIncidentCategoryBreakdown().then(setCategoryBreakdown);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Overview" subtitle="A snapshot of activity across FlowTransit." />

      {stats ? (
        <OverviewStats stats={stats} />
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="mb-3 font-medium text-ink">Trips per day, last 14 days</p>
          <TripsPerDayChart data={tripsPerDay} />
        </Card>
        <Card>
          <p className="mb-3 font-medium text-ink">Incident reports, last 14 days</p>
          <TrendLineChart data={incidentTrend} seriesName="Incidents" color="#DC2626" />
        </Card>
        <Card>
          <p className="mb-3 font-medium text-ink">Cumulative user growth</p>
          <UserGrowthChart data={userGrowth} />
        </Card>
        <Card>
          <p className="mb-3 font-medium text-ink">Trips by route</p>
          <RouteUsageBarChart data={routeUsage} />
        </Card>
        <Card>
          <p className="mb-3 font-medium text-ink">Incident status breakdown</p>
          <IncidentStatusDonut data={statusBreakdown} />
        </Card>
        <Card>
          <p className="mb-3 font-medium text-ink">Incident categories by severity</p>
          <IncidentCategoryChart data={categoryBreakdown} />
        </Card>
      </div>
    </div>
  );
}
