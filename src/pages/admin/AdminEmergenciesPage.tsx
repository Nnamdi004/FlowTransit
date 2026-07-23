import { useEffect, useMemo, useState } from 'react';
import { Siren } from 'lucide-react';
import type { SOSAlert, SOSStatus } from '@/types';
import * as sosService from '@/services/sosService';
import { useToast } from '@/hooks/useToast';
import { PageHeader } from '@/components/layout/PageHeader';
import { Select } from '@/components/ui/Select';
import { SkeletonRow } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { AdminEmergenciesTable } from '@/features/admin/emergencies/AdminEmergenciesTable';

const statusOrder: Record<SOSStatus, number> = { active: 0, acknowledged: 1, resolved: 2 };

export function AdminEmergenciesPage() {
  const toast = useToast();
  const [alerts, setAlerts] = useState<SOSAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | SOSStatus>('all');

  const refresh = () => {
    setIsLoading(true);
    sosService.listAllSOSAlerts().then((data) => {
      setAlerts(data);
      setIsLoading(false);
    });
  };

  useEffect(refresh, []);

  const filtered = useMemo(() => {
    const list = statusFilter === 'all' ? alerts : alerts.filter((a) => a.status === statusFilter);
    return [...list].sort(
      (a, b) => statusOrder[a.status] - statusOrder[b.status] || (a.createdAt < b.createdAt ? 1 : -1),
    );
  }, [alerts, statusFilter]);

  const handleUpdateStatus = async (id: string, status: SOSStatus) => {
    const updated = await sosService.updateSOSStatus(id, status);
    setAlerts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    toast.success(`Alert marked as ${status}.`);
  };

  return (
    <div>
      <PageHeader title="Emergencies" subtitle="Respond to SOS alerts sent by commuters." />

      <div className="mb-4">
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="w-48">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </Select>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-ink/5 bg-white">
          {[1, 2, 3].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<Siren className="size-6" />} title="No emergency alerts match these filters" />
      ) : (
        <AdminEmergenciesTable alerts={filtered} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
}
