import type { ScheduleEntry, ScheduleStatus } from '@/types';
import { Table, type TableColumn } from '@/components/ui/Table';
import { StatusPill } from '@/components/ui/StatusPill';

const statusTone: Record<ScheduleStatus, 'success' | 'warning' | 'danger'> = {
  'on-time': 'success',
  delayed: 'warning',
  cancelled: 'danger',
};

const statusLabel: Record<ScheduleStatus, string> = {
  'on-time': 'On time',
  delayed: 'Delayed',
  cancelled: 'Cancelled',
};

function formatDays(daysOfWeek: number[]): string {
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (daysOfWeek.length === 7) return 'Daily';
  if (daysOfWeek.length === 5 && !daysOfWeek.includes(0) && !daysOfWeek.includes(6)) return 'Weekdays';
  return daysOfWeek.map((d) => names[d]).join(', ');
}

export function ScheduleTable({ entries }: { entries: ScheduleEntry[] }) {
  const columns: TableColumn<ScheduleEntry>[] = [
    { key: 'time', header: 'Departure', render: (e) => <span className="font-medium text-ink">{e.departureTime}</span> },
    { key: 'vehicle', header: 'Vehicle', render: (e) => e.vehicleName },
    { key: 'days', header: 'Days', render: (e) => formatDays(e.daysOfWeek) },
    { key: 'capacity', header: 'Capacity', render: (e) => `${e.capacity} seats` },
    { key: 'status', header: 'Status', render: (e) => <StatusPill label={statusLabel[e.status]} tone={statusTone[e.status]} /> },
  ];

  return <Table columns={columns} data={entries} rowKey={(e) => e.id} />;
}
