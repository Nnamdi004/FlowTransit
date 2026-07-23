import { Bus, Ship } from 'lucide-react';
import type { Incident } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { formatFriendlyDate } from '@/utils/formatDate';

const severityColor = { low: 'neutral', medium: 'warning', high: 'danger' } as const;

export function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row">
        {incident.imageUrl && (
          <img
            src={incident.imageUrl}
            alt={`Photo attached to "${incident.title}"`}
            className="h-32 w-full shrink-0 rounded-xl object-cover sm:w-40"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge color={incident.mode === 'road' ? 'primary' : 'secondary'}>
              {incident.mode === 'road' ? <Bus className="size-3.5" /> : <Ship className="size-3.5" />}
              {incident.mode === 'road' ? 'Road' : 'Ferry'}
            </Badge>
            <Badge color={severityColor[incident.severity]}>{incident.severity} severity</Badge>
            <IncidentStatusBadge status={incident.status} />
          </div>
          <p className="font-medium text-ink">{incident.title}</p>
          <p className="mt-1 text-sm text-ink-muted">{incident.description}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-subtle">
            <span>{incident.area}</span>
            <span>·</span>
            <span>Reported by {incident.reporterName}</span>
            <span>·</span>
            <span>{formatFriendlyDate(incident.createdAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
