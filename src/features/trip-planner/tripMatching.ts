import type { LatLng, RouteLine, Stop, TripOption } from '@/types';
import { haversineKm } from '@/utils/geo';

const SPEED_KMH: Record<'road' | 'ferry', number> = { road: 20, ferry: 18 };
const WALK_KMH = 4.5;

function pathDistanceKm(path: [number, number][]): number {
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1]!;
    const curr = path[i]!;
    total += haversineKm({ lat: prev[0], lng: prev[1] }, { lat: curr[0], lng: curr[1] });
  }
  return total;
}

function routeDurationMinutes(route: RouteLine): number {
  const travelMinutes = (pathDistanceKm(route.path) / SPEED_KMH[route.mode]) * 60;
  const waitMinutes = route.frequencyMinutes / 2;
  return Math.round(travelMinutes + waitMinutes);
}

function nearestStop(point: LatLng, stops: Stop[]): { stop: Stop; distanceKm: number } | null {
  let best: { stop: Stop; distanceKm: number } | null = null;
  for (const stop of stops) {
    const distanceKm = haversineKm(point, stop);
    if (!best || distanceKm < best.distanceKm) best = { stop, distanceKm };
  }
  return best;
}

function walkMinutes(km: number): number {
  return Math.max(1, Math.round((km / WALK_KMH) * 60));
}

export function matchTripOptions(
  origin: LatLng,
  destination: LatLng,
  routes: RouteLine[],
  stops: Stop[],
): TripOption[] {
  const originNearest = nearestStop(origin, stops);
  const destNearest = nearestStop(destination, stops);
  if (!originNearest || !destNearest) return [];

  const routesFromOrigin = routes.filter((r) => r.stopIds.includes(originNearest.stop.id));
  const routesToDest = routes.filter((r) => r.stopIds.includes(destNearest.stop.id));

  const options: TripOption[] = [];

  const directRoute = routesFromOrigin.find((r) => routesToDest.some((rd) => rd.id === r.id));
  if (directRoute) {
    const duration =
      routeDurationMinutes(directRoute) + walkMinutes(originNearest.distanceKm) + walkMinutes(destNearest.distanceKm);
    options.push({
      id: `opt-direct-${directRoute.id}`,
      routeIds: [directRoute.id],
      durationMinutes: duration,
      fareNGN: directRoute.fareNGN,
      transfers: 0,
      mode: directRoute.mode,
    });
  }

  const legA = routesFromOrigin[0];
  const legB = routesToDest.find((r) => r.id !== legA?.id) ?? routesToDest[0];
  if (legA && legB && legA.id !== legB.id && !options.some((o) => o.routeIds.includes(legA.id) && o.routeIds.includes(legB.id))) {
    const duration =
      routeDurationMinutes(legA) +
      routeDurationMinutes(legB) +
      walkMinutes(originNearest.distanceKm) +
      walkMinutes(destNearest.distanceKm) +
      10; // interchange buffer
    options.push({
      id: `opt-transfer-${legA.id}-${legB.id}`,
      routeIds: [legA.id, legB.id],
      durationMinutes: duration,
      fareNGN: legA.fareNGN + legB.fareNGN,
      transfers: 1,
      mode: legA.mode === legB.mode ? legA.mode : 'mixed',
    });
  }

  return options.sort((a, b) => a.durationMinutes - b.durationMinutes).slice(0, 3);
}
