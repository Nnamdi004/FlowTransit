import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Incident } from '@/types';
import { ChartTooltip } from './ChartTooltip';

const statusColor: Record<Incident['status'], string> = {
  open: '#DC2626',
  investigating: '#F59E0B',
  resolved: '#16A34A',
};

const statusLabel: Record<Incident['status'], string> = {
  open: 'Open',
  investigating: 'Investigating',
  resolved: 'Resolved',
};

interface IncidentStatusDonutProps {
  data: { status: Incident['status']; count: number }[];
}

export function IncidentStatusDonut({ data }: IncidentStatusDonutProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const chartData = data.map((d) => ({ name: statusLabel[d.status], value: d.count, status: d.status }));

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Tooltip content={<ChartTooltip />} />
          <Legend
            verticalAlign="bottom"
            formatter={(value) => <span className="text-xs text-ink-muted">{value}</span>}
          />
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={3}>
            {chartData.map((entry) => (
              <Cell key={entry.status} fill={statusColor[entry.status]} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-x-0 top-[90px] flex flex-col items-center">
        <p className="text-2xl font-semibold text-ink">{total}</p>
        <p className="text-xs text-ink-subtle">incidents</p>
      </div>
    </div>
  );
}
