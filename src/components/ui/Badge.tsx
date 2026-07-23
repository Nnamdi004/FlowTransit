import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type BadgeColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'warning' | 'danger';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
}

const colorClasses: Record<BadgeColor, string> = {
  primary: 'bg-primary-50 text-primary-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  accent: 'bg-accent-50 text-accent-700',
  neutral: 'bg-ink/5 text-ink-muted',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-danger',
};

export function Badge({ className, color = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        colorClasses[color],
        className,
      )}
      {...props}
    />
  );
}
