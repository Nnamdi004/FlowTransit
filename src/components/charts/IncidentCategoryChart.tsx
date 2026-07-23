import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { IncidentCategoryPoint } from '@/services/analyticsService';
import { ChartTooltip } from './ChartTooltip';

const categoryColor = { low: '#94A3B8', medium: '#F59E0B', high: '#DC2626' } as const;
const categoryLabel = { low: 'Low', medium: 'Medium', high: 'High' } as const;

export function IncidentCategoryChart({ data }: { data: IncidentCategoryPoint[] }) {
  const chartData = data.map((d) => ({ ...d, label: categoryLabel[d.category] }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid horizontal={false} stroke="#E2E8F0" />
        <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fontSize: 12, fill: '#475569' }}
          axisLine={false}
          tickLine={false}
          width={64}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: '#F1F5F9' }} />
        <Bar dataKey="count" name="Incidents" radius={[0, 4, 4, 0]} maxBarSize={28}>
          {chartData.map((entry) => (
            <Cell key={entry.category} fill={categoryColor[entry.category]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
