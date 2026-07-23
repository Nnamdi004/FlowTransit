import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { PublicUser } from '@/types';
import * as authService from '@/services/authService';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  user: PublicUser | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<PublicUser>;
  register: (input: { name: string; email: string; password: string }) => Promise<PublicUser>;
  logout: () => void;
  updateProfile: (patch: { name?: string; phone?: string; avatarUrl?: string }) => Promise<PublicUser>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('idle');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    authService.getSession().then((result) => {
      if (cancelled) return;
      setUser(result?.user ?? null);
      setStatus(result ? 'authenticated' : 'unauthenticated');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user: loggedInUser } = await authService.login(email, password);
    setUser(loggedInUser);
    setStatus('authenticated');
    return loggedInUser;
  }, []);

  const register = useCallback(
    async (input: { name: string; email: string; password: string }) => {
      const { user: newUser } = await authService.register(input);
      setUser(newUser);
      setStatus('authenticated');
      return newUser;
    },
    [],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const updateProfile = useCallback(
    async (patch: { name?: string; phone?: string; avatarUrl?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const updated = await authService.updateProfile(user.id, patch);
      setUser(updated);
      return updated;
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, status, login, register, logout, updateProfile }),
    [user, status, login, register, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
