import type { PublicUser } from '@/types';
import { Table, type TableColumn } from '@/components/ui/Table';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatShortDate } from '@/utils/formatDate';

interface UsersTableProps {
  users: PublicUser[];
  onRowClick: (user: PublicUser) => void;
}

export function UsersTable({ users, onRowClick }: UsersTableProps) {
  const columns: TableColumn<PublicUser>[] = [
    {
      key: 'user',
      header: 'User',
      render: (u) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={u.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{u.name}</p>
            <p className="truncate text-xs text-ink-subtle">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (u) => <Badge color={u.role === 'admin' ? 'primary' : 'neutral'}>{u.role}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (u) => <StatusPill label={u.isActive ? 'Active' : 'Deactivated'} tone={u.isActive ? 'success' : 'neutral'} />,
    },
    { key: 'joined', header: 'Joined', render: (u) => formatShortDate(u.createdAt) },
  ];

  return <Table columns={columns} data={users} rowKey={(u) => u.id} onRowClick={onRowClick} />;
}
