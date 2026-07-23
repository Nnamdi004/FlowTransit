import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Marker, useMapEvents } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { MapView } from '@/components/map/MapView';
import { ImageUpload } from '@/components/form/ImageUpload';
import { lagosLandmarks } from '@/mock/geo/lagosLandmarks';
import { haversineKm } from '@/utils/geo';
import type { NewIncidentInput } from '@/types';

const incidentSchema = z.object({
  mode: z.enum(['road', 'ferry']),
  title: z.string().min(4, 'Give a short, clear title'),
  description: z.string().min(10, 'Add a few more details to help other commuters'),
  severity: z.enum(['low', 'medium', 'high']),
});

type IncidentFormValues = z.infer<typeof incidentSchema>;

const LAGOS_CENTER: [number, number] = [6.505, 3.42];

function nearestArea(lat: number, lng: number): string {
  let best = lagosLandmarks[0]!;
  let bestDist = Infinity;
  for (const lm of lagosLandmarks) {
    const dist = haversineKm({ lat, lng }, lm);
    if (dist < bestDist) {
      bestDist = dist;
      best = lm;
    }
  }
  return best.area;
}

function LocationPicker({
  position,
  onPick,
}: {
  position: [number, number];
  onPick: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click: (e) => onPick([e.latlng.lat, e.latlng.lng]),
  });
  return <Marker position={position} />;
}

interface IncidentFormProps {
  onSubmit: (input: NewIncidentInput) => Promise<void>;
  onCancel: () => void;
}

export function IncidentForm({ onSubmit, onCancel }: IncidentFormProps) {
  const [position, setPosition] = useState<[number, number]>(LAGOS_CENTER);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentSchema),
    defaultValues: { mode: 'road', severity: 'medium' },
  });

  const submit = async (values: IncidentFormValues) => {
    await onSubmit({
      ...values,
      lat: position[0],
      lng: position[1],
      area: nearestArea(position[0], position[1]),
      imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Mode" htmlFor="mode">
          <Select id="mode" {...register('mode')}>
            <option value="road">Road</option>
            <option value="ferry">Ferry</option>
          </Select>
        </FormField>
        <FormField label="Severity" htmlFor="severity">
          <Select id="severity" {...register('severity')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormField>
      </div>

      <FormField label="Title" htmlFor="title" error={errors.title?.message}>
        <Input id="title" placeholder="e.g. Flooding near Lekki roundabout" invalid={!!errors.title} {...register('title')} />
      </FormField>

      <FormField label="Description" htmlFor="description" error={errors.description?.message}>
        <Textarea
          id="description"
          rows={3}
          placeholder="What's happening? How much delay should other commuters expect?"
          invalid={!!errors.description}
          {...register('description')}
        />
      </FormField>

      <FormField label="Location" htmlFor="location" hint="Tap the map to drop a pin at the incident location.">
        <div className="h-52 overflow-hidden rounded-xl border border-ink/10">
          <MapView center={position} zoom={12}>
            <LocationPicker position={position} onPick={setPosition} />
          </MapView>
        </div>
        <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-ink-subtle">
          <MapPin className="size-3.5" /> {nearestArea(position[0], position[1])}
        </p>
      </FormField>

      <FormField label="Photo (optional)" htmlFor="image" hint="Attach a photo to help others recognise the situation." error={imageError ?? undefined}>
        <ImageUpload value={imageUrl} onChange={setImageUrl} onError={setImageError} />
      </FormField>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Submit report
        </Button>
      </div>
    </form>
  );
}
