import { useState } from 'react';
import type { SOSAlert, SOSStatus } from '@/types';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

interface SOSStatusUpdateFormProps {
  alert: SOSAlert;
  onUpdate: (id: string, status: SOSStatus) => Promise<void>;
}

export function SOSStatusUpdateForm({ alert, onUpdate }: SOSStatusUpdateFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (status: SOSStatus) => {
    setIsUpdating(true);
    try {
      await onUpdate(alert.id, status);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <Select
        value={alert.status}
        disabled={isUpdating}
        onChange={(e) => handleChange(e.target.value as SOSStatus)}
        className="h-8 text-xs"
      >
        <option value="active">Active</option>
        <option value="acknowledged">Acknowledged</option>
        <option value="resolved">Resolved</option>
      </Select>
      {isUpdating && <Spinner className="size-3.5" />}
    </div>
  );
}
