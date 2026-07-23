import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Incident, NewIncidentInput } from '@/types';
import { createIncident, listIncidents } from '@/services/incidentService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { IncidentList } from '@/features/incidents/IncidentList';
import { IncidentForm } from '@/features/incidents/IncidentForm';

export function IncidentsPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'all' | 'open' | 'investigating' | 'resolved'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const refresh = () => {
    setIsLoading(true);
    listIncidents(status === 'all' ? undefined : { status }).then((data) => {
      setIncidents(data);
      setIsLoading(false);
    });
  };

  useEffect(refresh, [status]);

  const handleSubmit = async (input: NewIncidentInput) => {
    if (!user) return;
    await createIncident(input, user.id);
    toast.success('Thanks — your report has been published.');
    setModalOpen(false);
    refresh();
  };

  return (
    <div>
      <PageHeader
        title="Incidents"
        subtitle="Traffic, flooding and ferry disruptions reported by the FlowTransit community."
        action={
          <Button size="sm" iconLeft={<Plus className="size-4" />} onClick={() => setModalOpen(true)}>
            Report incident
          </Button>
        }
      />
      <Tabs
        className="mb-4"
        value={status}
        onChange={(v) => setStatus(v as typeof status)}
        items={[
          { value: 'all', label: 'All' },
          { value: 'open', label: 'Open' },
          { value: 'investigating', label: 'Investigating' },
          { value: 'resolved', label: 'Resolved' },
        ]}
      />
      <IncidentList incidents={incidents} isLoading={isLoading} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Report an incident" size="lg">
        <IncidentForm onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
