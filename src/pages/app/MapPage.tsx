import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FavouriteLocation, Incident, RouteLine, Stop } from '@/types';
import { listRoutes } from '@/services/routeService';
import { listStops } from '@/services/stopService';
import { listIncidents } from '@/services/incidentService';
import { listFavourites } from '@/services/favouriteService';
import { useAuth } from '@/hooks/useAuth';
import { PageHeader } from '@/components/layout/PageHeader';
import { MapView } from '@/components/map/MapView';
import { RouteLayer } from '@/components/map/RouteLayer';
import { StopMarker } from '@/components/map/StopMarker';
import { IncidentMarker } from '@/components/map/IncidentMarker';
import { MapLegend } from '@/components/map/MapLegend';
import { MapFilterPanel, type MapFilters } from '@/components/map/MapFilterPanel';
import { MajorRoadsLayer } from '@/components/map/MajorRoadsLayer';
import { UserLocationMarker } from '@/components/map/UserLocationMarker';

const LAGOS_CENTER: [number, number] = [6.505, 3.42];
const DEFAULT_USER_LOCATION: [number, number] = [6.5095, 3.3711]; // Yaba

export function MapPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const highlightedRouteId = searchParams.get('routeId');

  const [routes, setRoutes] = useState<RouteLine[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [favourites, setFavourites] = useState<FavouriteLocation[]>([]);
  const [filters, setFilters] = useState<MapFilters>({ road: true, ferry: true, incidents: true, majorRoads: true });

  useEffect(() => {
    Promise.all([listRoutes(), listStops(), listIncidents()]).then(
      ([routesData, stopsData, incidentsData]) => {
        setRoutes(routesData);
        setStops(stopsData);
        setIncidents(incidentsData.filter((i) => i.status !== 'resolved'));
      },
    );
  }, []);

  useEffect(() => {
    if (!user) return;
    listFavourites(user.id).then(setFavourites);
  }, [user]);

  const visibleRoutes = routes.filter((r) => (r.mode === 'road' ? filters.road : filters.ferry));
  const visibleStops = stops.filter((s) => (s.mode === 'road' ? filters.road : filters.ferry));
  const userLocation: [number, number] = favourites[0]
    ? [favourites[0].lat, favourites[0].lng]
    : DEFAULT_USER_LOCATION;

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Live map" subtitle="Road and ferry routes, stops and active incidents across Lagos." />
      <div className="relative h-[70vh] min-h-[420px] flex-1 overflow-hidden rounded-2xl border border-ink/5 shadow-card md:h-[calc(100vh-11rem)]">
        <MapView center={LAGOS_CENTER} zoom={11}>
          {filters.majorRoads && <MajorRoadsLayer />}
          {visibleRoutes.map((route) => (
            <RouteLayer key={route.id} route={route} highlighted={route.id === highlightedRouteId} />
          ))}
          {visibleStops.map((stop) => (
            <StopMarker key={stop.id} stop={stop} />
          ))}
          {filters.incidents && incidents.map((incident) => <IncidentMarker key={incident.id} incident={incident} />)}
          <UserLocationMarker position={userLocation} label={favourites[0]?.label ?? 'Your location'} />
        </MapView>
        <MapFilterPanel filters={filters} onChange={setFilters} />
        <MapLegend />
      </div>
    </div>
  );
}
