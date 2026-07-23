import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { Role } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export function RoleGuard({ role, children }: { role: Role; children: ReactNode }) {
  const { user } = useAuth();

  if (user && user.role !== role) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
}
