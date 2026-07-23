import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { RouteUsagePoint } from '@/services/analyticsService';
import { ChartTooltip } from './ChartTooltip';

const modeColor = { road: '#1D4ED8', ferry: '#06B6D4' } as const;

function truncate(name: string, max = 14): string {
  return name.length > max ? `${name.slice(0, max)}…` : name;
}

export function RouteUsageBarChart({ data }: { data: RouteUsagePoint[] }) {
  const chartData = data.slice(0, 8).map((d) => ({ ...d, shortName: truncate(d.routeName) }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#E2E8F0" />
        <XAxis
          dataKey="shortName"
          tick={{ fontSize: 10, fill: '#94A3B8' }}
          axisLine={{ stroke: '#E2E8F0' }}
          tickLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={50}
        />
        <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: '#F1F5F9' }} />
        <Legend
          formatter={(value) => <span className="text-xs text-ink-muted">{value}</span>}
          payload={[
            { value: 'Road / BRT', type: 'square', color: modeColor.road },
            { value: 'Ferry', type: 'square', color: modeColor.ferry },
          ]}
        />
        <Bar dataKey="trips" name="Trips" radius={[4, 4, 0, 0]} maxBarSize={36}>
          {chartData.map((entry) => (
            <Cell key={entry.routeName} fill={modeColor[entry.mode]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
