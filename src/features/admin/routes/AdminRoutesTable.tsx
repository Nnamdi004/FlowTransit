import { Link } from 'react-router-dom';
import { MapPinned, Pencil, Trash2 } from 'lucide-react';
import type { RouteLine } from '@/types';
import { Table, type TableColumn } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { IconButton } from '@/components/ui/IconButton';
import { formatNaira } from '@/utils/formatDistance';

interface AdminRoutesTableProps {
  routes: RouteLine[];
  onEdit: (route: RouteLine) => void;
  onDelete: (route: RouteLine) => void;
}

export function AdminRoutesTable({ routes, onEdit, onDelete }: AdminRoutesTableProps) {
  const columns: TableColumn<RouteLine>[] = [
    {
      key: 'name',
      header: 'Route',
      render: (r) => (
        <div>
          <p className="font-medium text-ink">{r.name}</p>
          <p className="text-xs text-ink-subtle">{r.operator}</p>
        </div>
      ),
    },
    { key: 'mode', header: 'Mode', render: (r) => <Badge color={r.mode === 'road' ? 'primary' : 'secondary'}>{r.mode}</Badge> },
    { key: 'stops', header: 'Stops', render: (r) => r.stopIds.length },
    { key: 'fare', header: 'Fare', render: (r) => formatNaira(r.fareNGN) },
    { key: 'frequency', header: 'Frequency', render: (r) => `${r.frequencyMinutes} min` },
    {
      key: 'actions',
      header: '',
      render: (r) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Link to={`/app/map?routeId=${r.id}`}>
            <IconButton icon={<MapPinned className="size-4" />} label="View on map" variant="ghost" size="sm" />
          </Link>
          <IconButton icon={<Pencil className="size-4" />} label="Edit route" variant="ghost" size="sm" onClick={() => onEdit(r)} />
          <IconButton
            icon={<Trash2 className="size-4" />}
            label="Delete route"
            variant="ghost"
            size="sm"
            onClick={() => onDelete(r)}
            className="text-ink-subtle hover:text-danger"
          />
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={routes} rowKey={(r) => r.id} />;
}
