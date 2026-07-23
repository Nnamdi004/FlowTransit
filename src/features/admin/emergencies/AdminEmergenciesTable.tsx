import type { SOSAlert, SOSStatus } from '@/types';
import { Table, type TableColumn } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatFriendlyDate } from '@/utils/formatDate';
import { SOSStatusUpdateForm } from './SOSStatusUpdateForm';

const categoryColor = { medical: 'danger', accident: 'warning', security: 'primary', other: 'neutral' } as const;
const categoryLabel = { medical: 'Medical', accident: 'Accident', security: 'Security', other: 'Other' } as const;

interface AdminEmergenciesTableProps {
  alerts: SOSAlert[];
  onUpdateStatus: (id: string, status: SOSStatus) => Promise<void>;
}

export function AdminEmergenciesTable({ alerts, onUpdateStatus }: AdminEmergenciesTableProps) {
  const columns: TableColumn<SOSAlert>[] = [
    {
      key: 'reporter',
      header: 'Reported by',
      render: (a) => (
        <div className="max-w-xs">
          <p className="truncate font-medium text-ink">{a.userName}</p>
          <p className="truncate text-xs text-ink-subtle">{a.userPhone ?? 'No phone on file'}</p>
        </div>
      ),
    },
    { key: 'category', header: 'Category', render: (a) => <Badge color={categoryColor[a.category]}>{categoryLabel[a.category]}</Badge> },
    {
      key: 'location',
      header: 'Location',
      render: (a) => <span className="text-sm text-ink">{a.area}</span>,
    },
    {
      key: 'note',
      header: 'Details',
      render: (a) => <span className="line-clamp-2 max-w-xs text-sm text-ink-muted">{a.note || '—'}</span>,
    },
    { key: 'date', header: 'Reported', render: (a) => formatFriendlyDate(a.createdAt) },
    { key: 'status', header: 'Status', render: (a) => <SOSStatusUpdateForm alert={a} onUpdate={onUpdateStatus} /> },
  ];

  return <Table columns={columns} data={alerts} rowKey={(a) => a.id} />;
}
