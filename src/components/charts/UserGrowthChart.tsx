import type { TrendPoint } from '@/services/analyticsService';
import { TrendLineChart } from './TrendLineChart';

export function UserGrowthChart({ data }: { data: TrendPoint[] }) {
  return <TrendLineChart data={data} seriesName="Total users" color="#1D4ED8" />;
}
