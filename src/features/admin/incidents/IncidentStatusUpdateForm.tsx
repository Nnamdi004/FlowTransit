import { useState } from 'react';
import type { Incident, IncidentStatus } from '@/types';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

interface IncidentStatusUpdateFormProps {
  incident: Incident;
  onUpdate: (id: string, status: IncidentStatus) => Promise<void>;
}

export function IncidentStatusUpdateForm({ incident, onUpdate }: IncidentStatusUpdateFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (status: IncidentStatus) => {
    setIsUpdating(true);
    try {
      await onUpdate(incident.id, status);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <Select
        value={incident.status}
        disabled={isUpdating}
        onChange={(e) => handleChange(e.target.value as IncidentStatus)}
        className="h-8 text-xs"
      >
        <option value="open">Open</option>
        <option value="investigating">Investigating</option>
        <option value="resolved">Resolved</option>
      </Select>
      {isUpdating && <Spinner className="size-3.5" />}
    </div>
  );
}
