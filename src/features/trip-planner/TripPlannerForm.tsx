import { useState, type FormEvent } from 'react';
import { ArrowUpDown, Navigation } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { LocationAutocomplete } from '@/components/form/LocationAutocomplete';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import type { LagosLandmark } from '@/mock/geo/lagosLandmarks';

interface TripPlannerFormProps {
  onSearch: (origin: LagosLandmark, destination: LagosLandmark) => void;
  isSearching?: boolean;
}

export function TripPlannerForm({ onSearch, isSearching }: TripPlannerFormProps) {
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [origin, setOrigin] = useState<LagosLandmark | null>(null);
  const [destination, setDestination] = useState<LagosLandmark | null>(null);
  const [error, setError] = useState<string | null>(null);

  const swap = () => {
    const nextOrigin = destination;
    const nextDest = origin;
    setOrigin(nextOrigin);
    setDestination(nextDest);
    setOriginQuery(nextOrigin?.name ?? '');
    setDestQuery(nextDest?.name ?? '');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      setError('Choose both a starting point and a destination from the suggestions.');
      return;
    }
    if (origin.id === destination.id) {
      setError('Origin and destination cannot be the same place.');
      return;
    }
    setError(null);
    onSearch(origin, destination);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end">
        <FormField label="From" htmlFor="origin" className="flex-1">
          <LocationAutocomplete
            id="origin"
            value={originQuery}
            onChange={(v) => {
              setOriginQuery(v);
              setOrigin(null);
            }}
            onSelect={(lm) => {
              setOrigin(lm);
              setOriginQuery(lm.name);
            }}
            placeholder="Current location or area"
          />
        </FormField>
        <IconButton
          icon={<ArrowUpDown className="size-4" />}
          label="Swap origin and destination"
          variant="outline"
          onClick={swap}
          className="self-center sm:mb-0.5"
        />
        <FormField label="To" htmlFor="destination" className="flex-1">
          <LocationAutocomplete
            id="destination"
            value={destQuery}
            onChange={(v) => {
              setDestQuery(v);
              setDestination(null);
            }}
            onSelect={(lm) => {
              setDestination(lm);
              setDestQuery(lm.name);
            }}
            placeholder="Where are you headed?"
          />
        </FormField>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <Button type="submit" isLoading={isSearching} iconLeft={<Navigation className="size-4" />} className="self-start">
        Find trips
      </Button>
    </form>
  );
}
