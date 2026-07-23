import { useContext } from 'react';
import { SOSContext } from '@/context/SOSContext';

export function useSOS() {
  const ctx = useContext(SOSContext);
  if (!ctx) throw new Error('useSOS must be used within an SOSProvider');
  return ctx;
}
