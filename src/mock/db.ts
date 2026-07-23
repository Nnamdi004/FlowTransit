import type {
  AppNotification,
  FavouriteLocation,
  Incident,
  RouteLine,
  ScheduleEntry,
  SOSAlert,
  Stop,
  Trip,
  User,
} from '@/types';
import { usersSeed } from './seed/users.seed';
import { stopsSeed } from './seed/stops.seed';
import { routesSeed } from './seed/routes.seed';
import { incidentsSeed } from './seed/incidents.seed';
import { notificationsSeed } from './seed/notifications.seed';
import { favouritesSeed } from './seed/favourites.seed';
import { tripsSeed } from './seed/trips.seed';
import { schedulesSeed } from './seed/schedules.seed';
import { sosSeed } from './seed/sos.seed';

const STORAGE_KEY = 'flowtransit_db';
const DB_VERSION = 2;

interface Store {
  version: number;
  users: User[];
  stops: Stop[];
  routes: RouteLine[];
  incidents: Incident[];
  notifications: AppNotification[];
  favourites: FavouriteLocation[];
  trips: Trip[];
  schedules: ScheduleEntry[];
  sosAlerts: SOSAlert[];
}

function seedStore(): Store {
  return {
    version: DB_VERSION,
    users: structuredClone(usersSeed),
    stops: structuredClone(stopsSeed),
    routes: structuredClone(routesSeed),
    incidents: structuredClone(incidentsSeed),
    notifications: structuredClone(notificationsSeed),
    favourites: structuredClone(favouritesSeed),
    trips: structuredClone(tripsSeed),
    schedules: structuredClone(schedulesSeed),
    sosAlerts: structuredClone(sosSeed),
  };
}

function loadStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedStore();
    const parsed = JSON.parse(raw) as Store;
    if (parsed.version !== DB_VERSION) return seedStore();
    return parsed;
  } catch {
    return seedStore();
  }
}

let store = loadStore();

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function resetStore() {
  store = seedStore();
  persist();
}

// ---- Users ----
export function getUsers(): User[] {
  return store.users;
}

export function findUserById(id: string): User | undefined {
  return store.users.find((u) => u.id === id);
}

export function findUserByEmail(email: string): User | undefined {
  return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function insertUser(user: User): User {
  store.users.push(user);
  persist();
  return user;
}

export function updateUser(id: string, patch: Partial<User>): User | undefined {
  const user = findUserById(id);
  if (!user) return undefined;
  Object.assign(user, patch);
  persist();
  return user;
}

// ---- Stops ----
export function getStops(): Stop[] {
  return store.stops;
}

// ---- Routes ----
export function getRoutes(): RouteLine[] {
  return store.routes;
}

export function findRouteById(id: string): RouteLine | undefined {
  return store.routes.find((r) => r.id === id);
}

export function insertRoute(route: RouteLine): RouteLine {
  store.routes.push(route);
  persist();
  return route;
}

export function updateRoute(id: string, patch: Partial<RouteLine>): RouteLine | undefined {
  const route = findRouteById(id);
  if (!route) return undefined;
  Object.assign(route, patch);
  persist();
  return route;
}

export function deleteRoute(id: string): void {
  store.routes = store.routes.filter((r) => r.id !== id);
  persist();
}

// ---- Incidents ----
export function getIncidents(): Incident[] {
  return store.incidents;
}

export function findIncidentById(id: string): Incident | undefined {
  return store.incidents.find((i) => i.id === id);
}

export function insertIncident(incident: Incident): Incident {
  store.incidents.unshift(incident);
  persist();
  return incident;
}

export function updateIncident(id: string, patch: Partial<Incident>): Incident | undefined {
  const incident = findIncidentById(id);
  if (!incident) return undefined;
  Object.assign(incident, patch);
  persist();
  return incident;
}

// ---- Notifications ----
export function getNotifications(): AppNotification[] {
  return store.notifications;
}

export function insertNotification(notification: AppNotification): AppNotification {
  store.notifications.unshift(notification);
  persist();
  return notification;
}

export function updateNotification(
  id: string,
  patch: Partial<AppNotification>,
): AppNotification | undefined {
  const notification = store.notifications.find((n) => n.id === id);
  if (!notification) return undefined;
  Object.assign(notification, patch);
  persist();
  return notification;
}

export function markAllNotificationsRead(userId: string): void {
  store.notifications.forEach((n) => {
    if (n.userId === userId) n.read = true;
  });
  persist();
}

// ---- Favourites ----
export function getFavourites(): FavouriteLocation[] {
  return store.favourites;
}

export function insertFavourite(favourite: FavouriteLocation): FavouriteLocation {
  store.favourites.push(favourite);
  persist();
  return favourite;
}

export function deleteFavourite(id: string): void {
  store.favourites = store.favourites.filter((f) => f.id !== id);
  persist();
}

// ---- Trips ----
export function getTrips(): Trip[] {
  return store.trips;
}

export function insertTrip(trip: Trip): Trip {
  store.trips.unshift(trip);
  persist();
  return trip;
}

export function updateTrip(id: string, patch: Partial<Trip>): Trip | undefined {
  const trip = store.trips.find((t) => t.id === id);
  if (!trip) return undefined;
  Object.assign(trip, patch);
  persist();
  return trip;
}

// ---- Schedules ----
export function getSchedules(): ScheduleEntry[] {
  return store.schedules;
}

// ---- SOS Alerts ----
export function getSOSAlerts(): SOSAlert[] {
  return store.sosAlerts;
}

export function findSOSAlertById(id: string): SOSAlert | undefined {
  return store.sosAlerts.find((s) => s.id === id);
}

export function insertSOSAlert(alert: SOSAlert): SOSAlert {
  store.sosAlerts.unshift(alert);
  persist();
  return alert;
}

export function updateSOSAlert(id: string, patch: Partial<SOSAlert>): SOSAlert | undefined {
  const alert = findSOSAlertById(id);
  if (!alert) return undefined;
  Object.assign(alert, patch);
  persist();
  return alert;
}
