import { format, subDays, eachDayOfInterval } from 'date-fns';
import type { Incident, RouteLine, Trip, User } from '@/types';
import { apiClient } from './apiClient';

interface OverviewResponse {
  totalUsers: number;
  activeUsers: number;
  openIncidents: number;
  totalRoutes: number;
  totalTrips: number;
  incidents: Incident[];
  users: User[];
  routes: RouteLine[];
  trips: Trip[];
}

export interface OverviewStats {
  totalUsers: number;
  activeUsers: number;
  openIncidents: number;
  totalRoutes: number;
  totalTrips: number;
}

export interface TrendPoint {
  date: string;
  count: number;
}

export interface RouteUsagePoint {
  routeName: string;
  mode: RouteLine['mode'];
  trips: number;
}

async function fetchOverview(): Promise<OverviewResponse> {
  const { data } = await apiClient.get<OverviewResponse>('/admin/analytics/overview');
  return data;
}

export async function getOverviewStats(): Promise<OverviewStats> {
  const { totalUsers, activeUsers, openIncidents, totalRoutes, totalTrips } =
    await fetchOverview();
  return { totalUsers, activeUsers, openIncidents, totalRoutes, totalTrips };
}

export async function getIncidentTrend(days = 14): Promise<TrendPoint[]> {
  const { incidents } = await fetchOverview();
  const interval = eachDayOfInterval({ start: subDays(new Date(), days - 1), end: new Date() });
  return interval.map((day) => {
    const key = format(day, 'yyyy-MM-dd');
    const count = incidents.filter((i) => i.createdAt.startsWith(key)).length;
    return { date: format(day, 'd MMM'), count };
  });
}

export async function getUserGrowth(): Promise<TrendPoint[]> {
  const { users } = await fetchOverview();
  const sorted = [...users].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  let cumulative = 0;
  return sorted.map((user) => {
    cumulative += 1;
    return { date: format(new Date(user.createdAt), 'd MMM'), count: cumulative };
  });
}

export async function getRouteUsage(): Promise<RouteUsagePoint[]> {
  const { routes, trips } = await fetchOverview();
  return routes
    .map((route) => {
      const count = trips.filter((t) => t.selectedOption?.routeIds.includes(route.id)).length;
      return { routeName: route.name, mode: route.mode, trips: count };
    })
    .sort((a, b) => b.trips - a.trips);
}

export async function getIncidentStatusBreakdown(): Promise<
  { status: Incident['status']; count: number }[]
> {
  const { incidents } = await fetchOverview();
  const statuses: Incident['status'][] = ['open', 'investigating', 'resolved'];
  return statuses.map((status) => ({
    status,
    count: incidents.filter((i) => i.status === status).length,
  }));
}

export async function getTripsPerDay(days = 14): Promise<TrendPoint[]> {
  const { trips } = await fetchOverview();
  const interval = eachDayOfInterval({ start: subDays(new Date(), days - 1), end: new Date() });
  return interval.map((day) => {
    const key = format(day, 'yyyy-MM-dd');
    const count = trips.filter((t) => t.createdAt.startsWith(key)).length;
    return { date: format(day, 'd MMM'), count };
  });
}

export interface IncidentCategoryPoint {
  category: Incident['severity'];
  count: number;
}

export async function getIncidentCategoryBreakdown(): Promise<IncidentCategoryPoint[]> {
  const { incidents } = await fetchOverview();
  const severities: Incident['severity'][] = ['low', 'medium', 'high'];
  return severities.map((category) => ({
    category,
    count: incidents.filter((i) => i.severity === category).length,
  }));
}
