import type { Trip, TripStatus } from '@/types';
import { Table, type TableColumn } from '@/components/ui/Table';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatShortDate } from '@/utils/formatDate';
import { formatMinutes, formatNaira } from '@/utils/formatDistance';
import { TripHistoryRow } from './TripHistoryRow';

const statusTone: Record<TripStatus, 'success' | 'info' | 'neutral'> = {
  completed: 'success',
  planned: 'info',
  cancelled: 'neutral',
};

export function TripHistoryTable({ trips }: { trips: Trip[] }) {
  const columns: TableColumn<Trip>[] = [
    { key: 'trip', header: 'Trip', render: (t) => <TripHistoryRow trip={t} /> },
    { key: 'date', header: 'Date', render: (t) => formatShortDate(t.createdAt) },
    {
      key: 'duration',
      header: 'Duration',
      render: (t) => (t.selectedOption ? formatMinutes(t.selectedOption.durationMinutes) : '—'),
    },
    {
      key: 'fare',
      header: 'Fare',
      render: (t) => (t.selectedOption ? formatNaira(t.selectedOption.fareNGN) : '—'),
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => <StatusPill label={t.status} tone={statusTone[t.status]} />,
    },
  ];

  return <Table columns={columns} data={trips} rowKey={(t) => t.id} />;
}
