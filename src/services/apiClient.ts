import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { v4 as uuid } from 'uuid';
import type {
  Incident,
  IncidentStatus,
  NewIncidentInput,
  RouteLine,
  Session,
  Trip,
  User,
} from '@/types';
import { mockHash } from '@/utils/mockHash';
import * as db from '@/mock/db';

export const apiClient = axios.create({ baseURL: '/mock-api' });

const mock = new MockAdapter(apiClient, { delayResponse: 400 });

function toPublicUser(user: User) {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

function makeSession(userId: string): Session {
  return {
    userId,
    token: uuid(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  };
}

// ---- Auth ----
mock.onPost('/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data) as { email: string; password: string };
  const user = db.findUserByEmail(email);
  if (!user || user.passwordHash !== mockHash(password)) {
    return [401, { message: 'Invalid email or password.' }];
  }
  if (!user.isActive) {
    return [403, { message: 'This account has been deactivated.' }];
  }
  return [200, { user: toPublicUser(user), session: makeSession(user.id) }];
});

mock.onPost('/auth/register').reply((config) => {
  const { name, email, password } = JSON.parse(config.data) as {
    name: string;
    email: string;
    password: string;
  };
  if (db.findUserByEmail(email)) {
    return [409, { message: 'An account with this email already exists.' }];
  }
  const user: User = {
    id: `user-${uuid()}`,
    name,
    email,
    passwordHash: mockHash(password),
    role: 'user',
    createdAt: new Date().toISOString(),
    isActive: true,
  };
  db.insertUser(user);
  return [201, { user: toPublicUser(user), session: makeSession(user.id) }];
});

mock.onGet(/\/auth\/me\/.+/).reply((config) => {
  const userId = config.url!.split('/').pop()!;
  const user = db.findUserById(userId);
  if (!user) return [404, { message: 'Session user not found.' }];
  return [200, { user: toPublicUser(user) }];
});

mock.onPatch(/^\/users\/[^/]+$/).reply((config) => {
  const id = config.url!.split('/').pop()!;
  const patch = JSON.parse(config.data) as Partial<User>;
  const user = db.updateUser(id, patch);
  return user ? [200, toPublicUser(user)] : [404, { message: 'User not found.' }];
});

mock.onPost('/auth/forgot-password').reply((config) => {
  const { email } = JSON.parse(config.data) as { email: string };
  const user = db.findUserByEmail(email);
  // Never reveal whether an account exists — but for this demo (no real email
  // service) we hand back a token so the UI can offer a "continue" link.
  return [200, { success: true, demoResetToken: user ? btoa(email) : undefined }];
});

mock.onPost('/auth/reset-password').reply((config) => {
  const { token, newPassword } = JSON.parse(config.data) as { token: string; newPassword: string };
  let email: string;
  try {
    email = atob(token);
  } catch {
    return [400, { message: 'Invalid or expired reset link.' }];
  }
  const user = db.findUserByEmail(email);
  if (!user) return [400, { message: 'Invalid or expired reset link.' }];
  db.updateUser(user.id, { passwordHash: mockHash(newPassword) });
  return [200, { success: true }];
});

mock.onPost('/auth/change-password').reply((config) => {
  const { userId, currentPassword, newPassword } = JSON.parse(config.data) as {
    userId: string;
    currentPassword: string;
    newPassword: string;
  };
  const user = db.findUserById(userId);
  if (!user || user.passwordHash !== mockHash(currentPassword)) {
    return [401, { message: 'Current password is incorrect.' }];
  }
  db.updateUser(user.id, { passwordHash: mockHash(newPassword) });
  return [200, { success: true }];
});

// ---- Stops ----
mock.onGet('/stops').reply(() => [200, db.getStops()]);

// ---- Routes ----
mock.onGet('/routes').reply(() => [200, db.getRoutes()]);

mock.onGet(/\/routes\/.+/).reply((config) => {
  const id = config.url!.split('/').pop()!;
  const route = db.findRouteById(id);
  return route ? [200, route] : [404, { message: 'Route not found.' }];
});

mock.onPost('/routes').reply((config) => {
  const payload = JSON.parse(config.data) as Omit<RouteLine, 'id'>;
  const route: RouteLine = { ...payload, id: `route-${uuid()}` };
  db.insertRoute(route);
  return [201, route];
});

mock.onPatch(/\/routes\/.+/).reply((config) => {
  const id = config.url!.split('/').pop()!;
  const patch = JSON.parse(config.data) as Partial<RouteLine>;
  const route = db.updateRoute(id, patch);
  return route ? [200, route] : [404, { message: 'Route not found.' }];
});

mock.onDelete(/\/routes\/.+/).reply((config) => {
  const id = config.url!.split('/').pop()!;
  db.deleteRoute(id);
  return [204];
});

// ---- Incidents ----
mock.onGet('/incidents').reply((config) => {
  const params = (config.params ?? {}) as { status?: IncidentStatus; mode?: string };
  let incidents = db.getIncidents();
  if (params.status) incidents = incidents.filter((i) => i.status === params.status);
  if (params.mode) incidents = incidents.filter((i) => i.mode === params.mode);
  return [200, incidents];
});

mock.onPost('/incidents').reply((config) => {
  const { reporterId, ...payload } = JSON.parse(config.data) as NewIncidentInput & {
    reporterId: string;
  };
  const reporter = db.findUserById(reporterId);
  const now = new Date().toISOString();
  const incident: Incident = {
    ...payload,
    id: `incident-${uuid()}`,
    reporterId,
    reporterName: reporter?.name ?? 'Unknown commuter',
    status: 'open',
    createdAt: now,
    updatedAt: now,
  };
  db.insertIncident(incident);
  return [201, incident];
});

mock.onPatch(/\/incidents\/.+\/status/).reply((config) => {
  const id = config.url!.split('/')[2]!;
  const { status } = JSON.parse(config.data) as { status: IncidentStatus };
  const incident = db.updateIncident(id, { status, updatedAt: new Date().toISOString() });
  return incident ? [200, incident] : [404, { message: 'Incident not found.' }];
});

// ---- Notifications ----
mock.onGet('/notifications').reply((config) => {
  const userId = (config.params ?? {}).userId as string | undefined;
  return [200, db.getNotifications().filter((n) => n.userId === userId)];
});

mock.onPatch(/\/notifications\/.+\/read/).reply((config) => {
  const id = config.url!.split('/')[2]!;
  const notification = db.updateNotification(id, { read: true });
  return notification ? [200, notification] : [404, { message: 'Notification not found.' }];
});

mock.onPost(/\/notifications\/read-all\/.+/).reply((config) => {
  const userId = config.url!.split('/').pop()!;
  db.markAllNotificationsRead(userId);
  return [200, { success: true }];
});

// ---- Favourites ----
mock.onGet('/favourites').reply((config) => {
  const userId = (config.params ?? {}).userId as string | undefined;
  return [200, db.getFavourites().filter((f) => f.userId === userId)];
});

mock.onPost('/favourites').reply((config) => {
  const payload = JSON.parse(config.data);
  const favourite = { ...payload, id: `fav-${uuid()}` };
  db.insertFavourite(favourite);
  return [201, favourite];
});

mock.onDelete(/\/favourites\/.+/).reply((config) => {
  const id = config.url!.split('/').pop()!;
  db.deleteFavourite(id);
  return [204];
});

// ---- Trips ----
mock.onGet('/trips').reply((config) => {
  const userId = (config.params ?? {}).userId as string | undefined;
  return [200, db.getTrips().filter((t) => t.userId === userId)];
});

mock.onPost('/trips').reply((config) => {
  const payload = JSON.parse(config.data) as Omit<Trip, 'id' | 'createdAt'>;
  const trip: Trip = { ...payload, id: `trip-${uuid()}`, createdAt: new Date().toISOString() };
  db.insertTrip(trip);
  return [201, trip];
});

mock.onPatch(/\/trips\/.+/).reply((config) => {
  const id = config.url!.split('/').pop()!;
  const patch = JSON.parse(config.data) as Partial<Trip>;
  const trip = db.updateTrip(id, patch);
  return trip ? [200, trip] : [404, { message: 'Trip not found.' }];
});

// ---- Admin: Users ----
mock.onGet('/admin/users').reply(() => [200, db.getUsers().map(toPublicUser)]);

mock.onPatch(/\/admin\/users\/.+/).reply((config) => {
  const id = config.url!.split('/').pop()!;
  const patch = JSON.parse(config.data) as Partial<User>;
  const user = db.updateUser(id, patch);
  return user ? [200, toPublicUser(user)] : [404, { message: 'User not found.' }];
});

// ---- Admin: Analytics ----
mock.onGet('/admin/analytics/overview').reply(() => {
  const users = db.getUsers();
  const incidents = db.getIncidents();
  const routes = db.getRoutes();
  const trips = db.getTrips();

  return [
    200,
    {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.isActive).length,
      openIncidents: incidents.filter((i) => i.status !== 'resolved').length,
      totalRoutes: routes.length,
      totalTrips: trips.length,
      incidents,
      users,
      routes,
      trips,
    },
  ];
});

mock.onAny().passThrough();
