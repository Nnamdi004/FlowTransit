import { useEffect, useMemo, useState } from 'react';
import type { Incident, RouteLine, Stop } from '@/types';
import { listRoutes } from '@/services/routeService';
import { listStops } from '@/services/stopService';
import { listIncidents } from '@/services/incidentService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { SearchInput } from '@/components/ui/SearchInput';
import { RouteList } from '@/features/routes/RouteList';
import { useDebounce } from '@/hooks/useDebounce';

export function RoutesPage() {
  const [routes, setRoutes] = useState<RouteLine[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'all' | 'road' | 'ferry'>('all');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    Promise.all([listRoutes(), listStops(), listIncidents()]).then(
      ([routesData, stopsData, incidentsData]) => {
        setRoutes(routesData);
        setStops(stopsData);
        setIncidents(incidentsData);
        setIsLoading(false);
      },
    );
  }, []);

  const unsafeAreas = useMemo(
    () => new Set(incidents.filter((i) => i.status !== 'resolved').map((i) => i.area)),
    [incidents],
  );

  const filtered = useMemo(() => {
    return routes.filter((route) => {
      if (mode !== 'all' && route.mode !== mode) return false;
      if (!debouncedQuery) return true;
      const q = debouncedQuery.toLowerCase();
      return (
        route.name.toLowerCase().includes(q) || route.operator.toLowerCase().includes(q)
      );
    });
  }, [routes, mode, debouncedQuery]);

  return (
    <div>
      <PageHeader
        title="Routes"
        subtitle="Browse every road and ferry route across Lagos, with fares and frequency."
      />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={mode}
          onChange={(v) => setMode(v as typeof mode)}
          items={[
            { value: 'all', label: 'All routes', count: routes.length },
            { value: 'road', label: 'Road / BRT', count: routes.filter((r) => r.mode === 'road').length },
            { value: 'ferry', label: 'Ferry', count: routes.filter((r) => r.mode === 'ferry').length },
          ]}
        />
        <SearchInput value={query} onChange={setQuery} placeholder="Search routes or operators…" className="sm:w-72" />
      </div>
      <RouteList routes={filtered} stops={stops} unsafeAreas={unsafeAreas} isLoading={isLoading} />
    </div>
  );
}
