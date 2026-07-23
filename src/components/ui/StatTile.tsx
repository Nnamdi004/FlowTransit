import type { ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/utils/cn';

interface StatTileProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  delta?: { value: string; direction: 'up' | 'down' };
  tone?: 'primary' | 'secondary' | 'accent' | 'danger';
}

const toneClasses = {
  primary: 'bg-primary-50 text-primary-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  accent: 'bg-accent-50 text-accent-700',
  danger: 'bg-red-50 text-danger',
};

export function StatTile({ label, value, icon, delta, tone = 'primary' }: StatTileProps) {
  return (
    <Card className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-ink-muted">{label}</p>
        <p className="mt-1.5 text-2xl font-semibold text-ink">{value}</p>
        {delta && (
          <p
            className={cn(
              'mt-1.5 inline-flex items-center gap-0.5 text-xs font-medium',
              delta.direction === 'up' ? 'text-accent-700' : 'text-danger',
            )}
          >
            {delta.direction === 'up' ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {delta.value}
          </p>
        )}
      </div>
      <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', toneClasses[tone])}>
        {icon}
      </span>
    </Card>
  );
}
