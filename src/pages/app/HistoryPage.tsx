import { useEffect, useMemo, useState } from 'react';
import { History as HistoryIcon } from 'lucide-react';
import type { Trip, TripStatus } from '@/types';
import { listTrips } from '@/services/tripService';
import { useAuth } from '@/hooks/useAuth';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonRow } from '@/components/ui/Skeleton';
import { TripHistoryTable } from '@/features/history/TripHistoryTable';

const PAGE_SIZE = 5;

export function HistoryPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'all' | TripStatus>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    listTrips(user.id).then((data) => {
      setTrips(data);
      setIsLoading(false);
    });
  }, [user]);

  const filtered = useMemo(
    () => (status === 'all' ? trips : trips.filter((t) => t.status === status)),
    [trips, status],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader title="Trip history" subtitle="Every trip you've planned or completed on FlowTransit." />

      <Tabs
        className="mb-4"
        value={status}
        onChange={(v) => {
          setStatus(v as typeof status);
          setPage(1);
        }}
        items={[
          { value: 'all', label: 'All', count: trips.length },
          { value: 'completed', label: 'Completed', count: trips.filter((t) => t.status === 'completed').length },
          { value: 'planned', label: 'Planned', count: trips.filter((t) => t.status === 'planned').length },
          { value: 'cancelled', label: 'Cancelled', count: trips.filter((t) => t.status === 'cancelled').length },
        ]}
      />

      {isLoading ? (
        <div className="rounded-2xl border border-ink/5 bg-white">
          {[1, 2, 3].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<HistoryIcon className="size-6" />} title="No trips in this category yet" />
      ) : (
        <>
          <TripHistoryTable trips={pageItems} />
          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
