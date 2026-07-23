import { cn } from '@/utils/cn';

interface StatusPillProps {
  label: string;
  tone: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

const toneClasses: Record<StatusPillProps['tone'], string> = {
  success: 'bg-accent-50 text-accent-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-danger',
  info: 'bg-sky-50 text-info',
  neutral: 'bg-ink/5 text-ink-muted',
};

const dotClasses: Record<StatusPillProps['tone'], string> = {
  success: 'bg-accent-600',
  warning: 'bg-amber-500',
  danger: 'bg-danger',
  info: 'bg-info',
  neutral: 'bg-ink-subtle',
};

export function StatusPill({ label, tone, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize',
        toneClasses[tone],
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', dotClasses[tone])} aria-hidden />
      {label}
    </span>
  );
}
