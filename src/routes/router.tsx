import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout } from '@/layouts/AuthLayout';
import { AppShellLayout } from '@/layouts/AppShellLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

import { ProtectedRoute } from '@/components/feedback/ProtectedRoute';
import { RoleGuard } from '@/components/feedback/RoleGuard';
import { Spinner } from '@/components/ui/Spinner';

import { LandingPage } from '@/pages/public/LandingPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { ForgotPasswordPage } from '@/pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/public/ResetPasswordPage';
import { NotFoundPage } from '@/pages/public/NotFoundPage';
import { ErrorPage } from '@/pages/public/ErrorPage';

import { DashboardPage } from '@/pages/app/DashboardPage';
import { PlanTripPage } from '@/pages/app/PlanTripPage';
import { RoutesPage } from '@/pages/app/RoutesPage';
import { NotificationsPage } from '@/pages/app/NotificationsPage';
import { FavouritesPage } from '@/pages/app/FavouritesPage';
import { HistoryPage } from '@/pages/app/HistoryPage';
import { ProfilePage } from '@/pages/app/ProfilePage';

import { AdminUsersPage } from '@/pages/admin/AdminUsersPage';
import { AdminIncidentsPage } from '@/pages/admin/AdminIncidentsPage';

// Leaflet and Recharts are the heaviest deps in the bundle — split map and
// chart-heavy pages into their own chunks so the main entry stays lean.
const MapPage = lazy(() => import('@/pages/app/MapPage').then((m) => ({ default: m.MapPage })));
const IncidentsPage = lazy(() =>
  import('@/pages/app/IncidentsPage').then((m) => ({ default: m.IncidentsPage })),
);
const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })),
);
const AdminRoutesPage = lazy(() =>
  import('@/pages/admin/AdminRoutesPage').then((m) => ({ default: m.AdminRoutesPage })),
);

function PageSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] items-center justify-center">
          <Spinner className="size-6" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage />, errorElement: <ErrorPage /> },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '/app',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
        <AppShellLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'plan', element: <PlanTripPage /> },
      { path: 'routes', element: <RoutesPage /> },
      {
        path: 'map',
        element: (
          <PageSuspense>
            <MapPage />
          </PageSuspense>
        ),
      },
      {
        path: 'incidents',
        element: (
          <PageSuspense>
            <IncidentsPage />
          </PageSuspense>
        ),
      },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'favourites', element: <FavouritesPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '/admin',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
        <RoleGuard role="admin">
          <AdminLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: 'dashboard',
        element: (
          <PageSuspense>
            <AdminDashboardPage />
          </PageSuspense>
        ),
      },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'incidents', element: <AdminIncidentsPage /> },
      {
        path: 'routes',
        element: (
          <PageSuspense>
            <AdminRoutesPage />
          </PageSuspense>
        ),
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
