import type { IncidentStatus } from '@/types';
import { StatusPill } from '@/components/ui/StatusPill';

const toneByStatus: Record<IncidentStatus, 'danger' | 'warning' | 'success'> = {
  open: 'danger',
  investigating: 'warning',
  resolved: 'success',
};

export function IncidentStatusBadge({ status }: { status: IncidentStatus }) {
  return <StatusPill label={status} tone={toneByStatus[status]} />;
}
