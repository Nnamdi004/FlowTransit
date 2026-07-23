import type { TooltipProps } from 'recharts';

export function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-ink/5 bg-white px-3 py-2 text-xs shadow-card-hover">
      {label && <p className="mb-1 font-medium text-ink">{label}</p>}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-ink-muted">{entry.name}:</span>
          <span className="font-medium text-ink">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}
