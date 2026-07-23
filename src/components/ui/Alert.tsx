import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title: string;
  description?: string;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const variantConfig: Record<AlertVariant, { icon: typeof Info; classes: string; iconClasses: string }> = {
  success: { icon: CheckCircle2, classes: 'bg-accent-50 border-accent-200', iconClasses: 'text-accent-700' },
  error: { icon: XCircle, classes: 'bg-red-50 border-red-200', iconClasses: 'text-danger' },
  warning: { icon: AlertTriangle, classes: 'bg-amber-50 border-amber-200', iconClasses: 'text-amber-700' },
  info: { icon: Info, classes: 'bg-sky-50 border-sky-200', iconClasses: 'text-info' },
};

export function Alert({ variant, title, description, action, onDismiss, className }: AlertProps) {
  const { icon: Icon, classes, iconClasses } = variantConfig[variant];

  return (
    <div role="alert" className={cn('flex items-start gap-3 rounded-xl border px-4 py-3.5', classes, className)}>
      <Icon className={cn('mt-0.5 size-5 shrink-0', iconClasses)} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{title}</p>
        {description && <p className="mt-0.5 text-sm text-ink-muted">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-ink-subtle hover:text-ink"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
