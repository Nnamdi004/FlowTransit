import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import type { RouteLine, Stop, TripOption } from '@/types';
import { listRoutes } from '@/services/routeService';
import { listStops } from '@/services/stopService';
import { createTrip } from '@/services/tripService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { TripPlannerForm } from '@/features/trip-planner/TripPlannerForm';
import { TripOptionCard } from '@/features/trip-planner/TripOptionCard';
import { matchTripOptions } from '@/features/trip-planner/tripMatching';
import type { LagosLandmark } from '@/mock/geo/lagosLandmarks';

export function PlanTripPage() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [routes, setRoutes] = useState<RouteLine[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [options, setOptions] = useState<TripOption[] | null>(null);
  const [searchMeta, setSearchMeta] = useState<{ origin: LagosLandmark; destination: LagosLandmark } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([listRoutes(), listStops()]).then(([r, s]) => {
      setRoutes(r);
      setStops(s);
    });
  }, []);

  const handleSearch = (origin: LagosLandmark, destination: LagosLandmark) => {
    setIsSearching(true);
    setSearchMeta({ origin, destination });
    window.setTimeout(() => {
      const results = matchTripOptions(origin, destination, routes, stops);
      setOptions(results);
      setIsSearching(false);
    }, 500);
  };

  const handleConfirm = async (option: TripOption) => {
    if (!user || !searchMeta) return;
    setConfirmingId(option.id);
    try {
      await createTrip({
        userId: user.id,
        originLabel: searchMeta.origin.name,
        destinationLabel: searchMeta.destination.name,
        originLat: searchMeta.origin.lat,
        originLng: searchMeta.origin.lng,
        destinationLat: searchMeta.destination.lat,
        destinationLng: searchMeta.destination.lng,
        status: 'planned',
        selectedOption: option,
      });
      toast.success('Trip saved to your history.');
      navigate('/app/history');
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Plan a trip" subtitle="Compare road and ferry options across Lagos." />
      <Card className="mb-5">
        <TripPlannerForm onSearch={handleSearch} isSearching={isSearching} />
      </Card>

      {isSearching && (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!isSearching && options && options.length === 0 && (
        <EmptyState
          icon={<SearchX className="size-6" />}
          title="No routes found for this trip"
          description="Try a different origin or destination — coverage is currently focused on major Lagos corridors."
        />
      )}

      {!isSearching && options && options.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-ink-muted">{options.length} option{options.length > 1 ? 's' : ''} found</p>
          {options.map((option) => (
            <TripOptionCard
              key={option.id}
              option={option}
              routes={routes}
              onConfirm={() => handleConfirm(option)}
              isConfirming={confirmingId === option.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
