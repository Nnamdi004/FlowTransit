import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');

  return {
    toasts: ctx.toasts,
    dismiss: ctx.dismiss,
    success: (message: string) => ctx.show('success', message),
    error: (message: string) => ctx.show('error', message),
    info: (message: string) => ctx.show('info', message),
  };
}
