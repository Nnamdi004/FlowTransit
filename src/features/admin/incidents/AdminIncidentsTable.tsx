import type { Incident, IncidentStatus } from '@/types';
import { Table, type TableColumn } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatShortDate } from '@/utils/formatDate';
import { IncidentStatusUpdateForm } from './IncidentStatusUpdateForm';

const severityColor = { low: 'neutral', medium: 'warning', high: 'danger' } as const;

interface AdminIncidentsTableProps {
  incidents: Incident[];
  onUpdateStatus: (id: string, status: IncidentStatus) => Promise<void>;
}

export function AdminIncidentsTable({ incidents, onUpdateStatus }: AdminIncidentsTableProps) {
  const columns: TableColumn<Incident>[] = [
    {
      key: 'incident',
      header: 'Incident',
      render: (i) => (
        <div className="max-w-xs">
          <p className="truncate font-medium text-ink">{i.title}</p>
          <p className="truncate text-xs text-ink-subtle">{i.area}</p>
        </div>
      ),
    },
    { key: 'mode', header: 'Mode', render: (i) => <Badge color={i.mode === 'road' ? 'primary' : 'secondary'}>{i.mode}</Badge> },
    { key: 'severity', header: 'Severity', render: (i) => <Badge color={severityColor[i.severity]}>{i.severity}</Badge> },
    { key: 'reporter', header: 'Reported by', render: (i) => i.reporterName },
    { key: 'date', header: 'Date', render: (i) => formatShortDate(i.createdAt) },
    { key: 'status', header: 'Status', render: (i) => <IncidentStatusUpdateForm incident={i} onUpdate={onUpdateStatus} /> },
  ];

  return <Table columns={columns} data={incidents} rowKey={(i) => i.id} />;
}
