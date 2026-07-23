import { useEffect, useState } from 'react';
import type { Incident, IncidentStatus, TransportMode } from '@/types';
import { listIncidents, updateIncidentStatus } from '@/services/incidentService';
import { useToast } from '@/hooks/useToast';
import { PageHeader } from '@/components/layout/PageHeader';
import { Select } from '@/components/ui/Select';
import { SkeletonRow } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ShieldAlert } from 'lucide-react';
import { AdminIncidentsTable } from '@/features/admin/incidents/AdminIncidentsTable';

export function AdminIncidentsPage() {
  const toast = useToast();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | IncidentStatus>('all');
  const [modeFilter, setModeFilter] = useState<'all' | TransportMode>('all');

  const refresh = () => {
    setIsLoading(true);
    listIncidents({
      status: statusFilter === 'all' ? undefined : statusFilter,
      mode: modeFilter === 'all' ? undefined : modeFilter,
    }).then((data) => {
      setIncidents(data);
      setIsLoading(false);
    });
  };

  useEffect(refresh, [statusFilter, modeFilter]);

  const handleUpdateStatus = async (id: string, status: IncidentStatus) => {
    const updated = await updateIncidentStatus(id, status);
    setIncidents((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    toast.success(`Incident marked as ${status}.`);
  };

  return (
    <div>
      <PageHeader title="Incidents" subtitle="Review and update the status of reported incidents." />

      <div className="mb-4 flex flex-wrap gap-3">
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="w-44">
          <option value="all">All statuses</option>
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
        </Select>
        <Select value={modeFilter} onChange={(e) => setModeFilter(e.target.value as typeof modeFilter)} className="w-40">
          <option value="all">All modes</option>
          <option value="road">Road</option>
          <option value="ferry">Ferry</option>
        </Select>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-ink/5 bg-white">
          {[1, 2, 3].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : incidents.length === 0 ? (
        <EmptyState icon={<ShieldAlert className="size-6" />} title="No incidents match these filters" />
      ) : (
        <AdminIncidentsTable incidents={incidents} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
}
