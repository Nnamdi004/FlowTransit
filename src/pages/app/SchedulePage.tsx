import { useEffect, useMemo, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import type { RouteLine, ScheduleEntry, TransportMode } from '@/types';
import { listRoutes } from '@/services/routeService';
import { listSchedules } from '@/services/scheduleService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { ScheduleTable } from '@/features/schedule/ScheduleTable';

export function SchedulePage() {
  const [mode, setMode] = useState<TransportMode>('road');
  const [routes, setRoutes] = useState<RouteLine[]>([]);
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([listRoutes(), listSchedules()]).then(([routesData, schedulesData]) => {
      setRoutes(routesData);
      setSchedules(schedulesData);
      setSelectedRouteId(routesData.find((r) => r.mode === 'road')?.id ?? '');
      setIsLoading(false);
    });
  }, []);

  const routesForMode = useMemo(() => routes.filter((r) => r.mode === mode), [routes, mode]);

  useEffect(() => {
    if (routesForMode.length > 0 && !routesForMode.some((r) => r.id === selectedRouteId)) {
      setSelectedRouteId(routesForMode[0]!.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, routesForMode]);

  const entries = schedules
    .filter((s) => s.routeId === selectedRouteId)
    .sort((a, b) => a.departureTime.localeCompare(b.departureTime));

  return (
    <div>
      <PageHeader
        title="Transport schedules"
        subtitle="Timetables for road and water transport across Lagos."
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={mode}
          onChange={(v) => setMode(v as TransportMode)}
          items={[
            { value: 'road', label: 'Road / BRT' },
            { value: 'ferry', label: 'Ferry' },
          ]}
        />
        {routesForMode.length > 0 && (
          <Select
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="sm:w-64"
            aria-label="Select route"
          >
            {routesForMode.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </Select>
        )}
      </div>

      {isLoading ? (
        <SkeletonCard />
      ) : entries.length === 0 ? (
        <EmptyState icon={<CalendarClock className="size-6" />} title="No schedule available for this route" />
      ) : (
        <ScheduleTable entries={entries} />
      )}
    </div>
  );
}
