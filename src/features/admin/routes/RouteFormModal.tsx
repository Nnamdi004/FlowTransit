import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { RouteLine, Stop } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';

const routeSchema = z.object({
  name: z.string().min(3, 'Give the route a name'),
  mode: z.enum(['road', 'ferry']),
  operator: z.string().min(2, 'Enter an operator name'),
  fareNGN: z.coerce.number().min(50, 'Enter a realistic fare'),
  frequencyMinutes: z.coerce.number().min(5, 'Enter a realistic frequency'),
});

type RouteFormValues = z.infer<typeof routeSchema>;

const modeColor = { road: '#1D4ED8', ferry: '#0E7490' };

interface RouteFormModalProps {
  open: boolean;
  onClose: () => void;
  stops: Stop[];
  initialRoute?: RouteLine;
  onSubmit: (payload: Omit<RouteLine, 'id'>) => Promise<void>;
}

export function RouteFormModal({ open, onClose, stops, initialRoute, onSubmit }: RouteFormModalProps) {
  const [selectedStopIds, setSelectedStopIds] = useState<string[]>(initialRoute?.stopIds ?? []);
  const [stopError, setStopError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RouteFormValues>({
    resolver: zodResolver(routeSchema),
    defaultValues: initialRoute
      ? {
          name: initialRoute.name,
          mode: initialRoute.mode,
          operator: initialRoute.operator,
          fareNGN: initialRoute.fareNGN,
          frequencyMinutes: initialRoute.frequencyMinutes,
        }
      : { mode: 'road' },
  });

  const mode = watch('mode');

  useEffect(() => {
    if (open) {
      reset(
        initialRoute
          ? {
              name: initialRoute.name,
              mode: initialRoute.mode,
              operator: initialRoute.operator,
              fareNGN: initialRoute.fareNGN,
              frequencyMinutes: initialRoute.frequencyMinutes,
            }
          : { mode: 'road' },
      );
      setSelectedStopIds(initialRoute?.stopIds ?? []);
      setStopError(null);
    }
  }, [open, initialRoute, reset]);

  const modeStops = stops.filter((s) => s.mode === mode);

  const toggleStop = (id: string) => {
    setSelectedStopIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const submit = async (values: RouteFormValues) => {
    if (selectedStopIds.length < 2) {
      setStopError('Select at least two stops for this route.');
      return;
    }
    const path = selectedStopIds
      .map((id) => stops.find((s) => s.id === id))
      .filter((s): s is Stop => Boolean(s))
      .map((s) => [s.lat, s.lng] as [number, number]);

    await onSubmit({ ...values, color: modeColor[values.mode], stopIds: selectedStopIds, path });
  };

  return (
    <Modal open={open} onClose={onClose} title={initialRoute ? 'Edit route' : 'Add route'} size="lg">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Route name" htmlFor="name" error={errors.name?.message}>
            <Input id="name" invalid={!!errors.name} {...register('name')} />
          </FormField>
          <FormField label="Mode" htmlFor="mode">
            <Select id="mode" {...register('mode')} onChange={(e) => { register('mode').onChange(e); setSelectedStopIds([]); }}>
              <option value="road">Road / BRT</option>
              <option value="ferry">Ferry</option>
            </Select>
          </FormField>
          <FormField label="Operator" htmlFor="operator" error={errors.operator?.message}>
            <Input id="operator" invalid={!!errors.operator} {...register('operator')} />
          </FormField>
          <FormField label="Fare (NGN)" htmlFor="fareNGN" error={errors.fareNGN?.message}>
            <Input id="fareNGN" type="number" invalid={!!errors.fareNGN} {...register('fareNGN')} />
          </FormField>
          <FormField label="Frequency (minutes)" htmlFor="frequencyMinutes" error={errors.frequencyMinutes?.message}>
            <Input id="frequencyMinutes" type="number" invalid={!!errors.frequencyMinutes} {...register('frequencyMinutes')} />
          </FormField>
        </div>

        <FormField label="Stops on this route" htmlFor="stops" error={stopError ?? undefined}>
          <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded-xl border border-ink/10 p-3 sm:grid-cols-3">
            {modeStops.map((stop) => (
              <Checkbox
                key={stop.id}
                id={`stop-${stop.id}`}
                label={stop.name}
                checked={selectedStopIds.includes(stop.id)}
                onChange={() => toggleStop(stop.id)}
              />
            ))}
          </div>
        </FormField>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {initialRoute ? 'Save changes' : 'Create route'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
