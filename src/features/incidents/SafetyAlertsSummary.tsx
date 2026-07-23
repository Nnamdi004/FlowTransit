import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Incident } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatFriendlyDate } from '@/utils/formatDate';

const severityColor = { low: 'neutral', medium: 'warning', high: 'danger' } as const;

export function SafetyAlertsSummary({ incidents }: { incidents: Incident[] }) {
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 font-medium text-ink">
          <AlertTriangle className="size-4 text-danger" /> Route safety alerts
        </p>
        <Link
          to="/app/incidents"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {incidents.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-ink-subtle">
          <ShieldCheck className="size-4 text-accent-600" /> No active safety alerts on your routes right now.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-ink/5">
          {incidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{incident.title}</p>
                <p className="text-xs text-ink-subtle">
                  {incident.area} · {formatFriendlyDate(incident.createdAt)}
                </p>
              </div>
              <Badge color={severityColor[incident.severity]} className="shrink-0">
                {incident.severity}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
