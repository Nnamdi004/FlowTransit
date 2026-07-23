import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { LocationAutocomplete } from '@/components/form/LocationAutocomplete';
import { Button } from '@/components/ui/Button';
import type { LagosLandmark } from '@/mock/geo/lagosLandmarks';

interface AddFavouriteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: { label: string; landmark: LagosLandmark }) => Promise<void>;
}

export function AddFavouriteModal({ open, onClose, onSubmit }: AddFavouriteModalProps) {
  const [label, setLabel] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<LagosLandmark | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setLabel('');
    setQuery('');
    setSelected(null);
    setError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!label.trim()) {
      setError('Give this place a name.');
      return;
    }
    if (!selected) {
      setError('Search and select a location.');
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({ label: label.trim(), landmark: selected });
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add a favourite location" size="sm">
      <div className="flex flex-col gap-4">
        <FormField label="Label" htmlFor="fav-label">
          <Input
            id="fav-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Home, Work, Gym"
          />
        </FormField>
        <FormField label="Location" htmlFor="fav-location">
          <LocationAutocomplete
            id="fav-location"
            value={query}
            onChange={(v) => {
              setQuery(v);
              setSelected(null);
            }}
            onSelect={(lm) => {
              setSelected(lm);
              setQuery(lm.name);
            }}
            placeholder="Search a Lagos landmark or area…"
          />
        </FormField>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button onClick={handleSubmit} isLoading={isSubmitting} className="w-full">
          Save favourite
        </Button>
      </div>
    </Modal>
  );
}
