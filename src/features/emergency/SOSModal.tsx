import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Siren } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { FormField } from '@/components/form/FormField';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useSOS } from '@/hooks/useSOS';
import { useToast } from '@/hooks/useToast';
import { getCurrentPositionOrFallback } from '@/utils/geolocation';
import { findNearestArea } from '@/mock/geo/lagosLandmarks';

const DEFAULT_LOCATION = { lat: 6.5095, lng: 3.3711 }; // Yaba

const schema = z.object({
  category: z.enum(['medical', 'accident', 'security', 'other']),
  note: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

export function SOSModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { send, isSending } = useSOS();
  const toast = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { category: 'accident' } });

  useEffect(() => {
    if (!open) return;
    setLocation(null);
    getCurrentPositionOrFallback(DEFAULT_LOCATION).then(setLocation);
  }, [open]);

  const onSubmit = async (values: FormValues) => {
    const point = location ?? DEFAULT_LOCATION;
    await send({
      category: values.category,
      note: values.note,
      lat: point.lat,
      lng: point.lng,
      area: findNearestArea(point.lat, point.lng),
    });
    toast.success('SOS alert sent — help is on the way.');
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-red-50 text-danger">
          <Siren className="size-5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-ink">Send an emergency SOS</h3>
          <p className="mt-1 text-sm text-ink-muted">
            This alerts FlowTransit administrators immediately with your location. Only use this for a genuine
            emergency.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4" noValidate>
          <FormField label="What's happening?" htmlFor="category">
            <Select id="category" {...register('category')}>
              <option value="accident">Accident</option>
              <option value="medical">Medical emergency</option>
              <option value="security">Security concern</option>
              <option value="other">Other emergency</option>
            </Select>
          </FormField>

          <FormField label="Details (optional)" htmlFor="note">
            <Textarea id="note" rows={3} placeholder="Anything responders should know" {...register('note')} />
          </FormField>

          <div className="flex items-center gap-1.5 text-xs text-ink-subtle">
            <MapPin className="size-3.5" />
            {location ? (
              <span>Sharing your location near {findNearestArea(location.lat, location.lng)}</span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Spinner className="size-3" /> Detecting your location…
              </span>
            )}
          </div>

          <Button type="submit" variant="danger" isLoading={isSubmitting || isSending} className="w-full">
            Send SOS alert
          </Button>
        </form>
      </div>
    </Modal>
  );
}
