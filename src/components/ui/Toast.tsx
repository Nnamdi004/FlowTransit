import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

const iconByType = {
  success: <CheckCircle2 className="size-5 text-accent-600" />,
  error: <XCircle className="size-5 text-danger" />,
  info: <Info className="size-5 text-info" />,
};

const borderByType: Record<ToastType, string> = {
  success: 'border-l-accent-600',
  error: 'border-l-danger',
  info: 'border-l-info',
};

export function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      role="status"
      className={cn(
        'flex w-80 items-start gap-3 rounded-xl border-l-4 bg-white p-3.5 shadow-card-hover',
        borderByType[toast.type],
      )}
    >
      {iconByType[toast.type]}
      <p className="flex-1 text-sm text-ink">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-xs font-medium text-ink-subtle hover:text-ink"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </motion.div>
  );
}
