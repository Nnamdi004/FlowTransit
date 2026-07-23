import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { NewSOSInput, SOSAlert } from '@/types';
import * as sosService from '@/services/sosService';
import { useAuth } from '@/hooks/useAuth';

interface SOSContextValue {
  activeAlert: SOSAlert | null;
  isSending: boolean;
  send: (input: NewSOSInput) => Promise<SOSAlert>;
  cancel: () => Promise<void>;
}

export const SOSContext = createContext<SOSContextValue | undefined>(undefined);

export function SOSProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [activeAlert, setActiveAlert] = useState<SOSAlert | null>(null);
  const [isSending, setIsSending] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setActiveAlert(null);
      return;
    }
    const alerts = await sosService.listMySOSAlerts(user.id);
    const unresolved = alerts.find((a) => a.status !== 'resolved');
    setActiveAlert(unresolved ?? null);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const send = useCallback(
    async (input: NewSOSInput) => {
      if (!user) throw new Error('Not authenticated');
      setIsSending(true);
      try {
        const alert = await sosService.sendSOS(input, user.id);
        setActiveAlert(alert);
        return alert;
      } finally {
        setIsSending(false);
      }
    },
    [user],
  );

  const cancel = useCallback(async () => {
    if (!activeAlert) return;
    await sosService.updateSOSStatus(activeAlert.id, 'resolved');
    setActiveAlert(null);
  }, [activeAlert]);

  const value = useMemo(
    () => ({ activeAlert, isSending, send, cancel }),
    [activeAlert, isSending, send, cancel],
  );

  return <SOSContext.Provider value={value}>{children}</SOSContext.Provider>;
}
