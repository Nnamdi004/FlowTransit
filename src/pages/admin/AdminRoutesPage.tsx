import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import type { RouteLine, Stop } from '@/types';
import * as routeService from '@/services/routeService';
import { listStops } from '@/services/stopService';
import { useToast } from '@/hooks/useToast';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { SkeletonRow } from '@/components/ui/Skeleton';
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import { AdminRoutesTable } from '@/features/admin/routes/AdminRoutesTable';
import { RouteFormModal } from '@/features/admin/routes/RouteFormModal';

export function AdminRoutesPage() {
  const toast = useToast();
  const [routes, setRoutes] = useState<RouteLine[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteLine | undefined>(undefined);
  const [deletingRoute, setDeletingRoute] = useState<RouteLine | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    Promise.all([routeService.listRoutes(), listStops()]).then(([routesData, stopsData]) => {
      setRoutes(routesData);
      setStops(stopsData);
      setIsLoading(false);
    });
  }, []);

  const openCreate = () => {
    setEditingRoute(undefined);
    setModalOpen(true);
  };

  const openEdit = (route: RouteLine) => {
    setEditingRoute(route);
    setModalOpen(true);
  };

  const handleSubmit = async (payload: Omit<RouteLine, 'id'>) => {
    if (editingRoute) {
      const updated = await routeService.updateRoute(editingRoute.id, payload);
      setRoutes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      toast.success('Route updated.');
    } else {
      const created = await routeService.createRoute(payload);
      setRoutes((prev) => [...prev, created]);
      toast.success('Route created.');
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingRoute) return;
    setIsDeleting(true);
    try {
      await routeService.deleteRoute(deletingRoute.id);
      setRoutes((prev) => prev.filter((r) => r.id !== deletingRoute.id));
      toast.success('Route deleted.');
      setDeletingRoute(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Routes"
        subtitle="Manage road and ferry routes available to commuters."
        action={
          <Button size="sm" iconLeft={<Plus className="size-4" />} onClick={openCreate}>
            Add route
          </Button>
        }
      />

      {isLoading ? (
        <div className="rounded-2xl border border-ink/5 bg-white">
          {[1, 2, 3].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : (
        <AdminRoutesTable routes={routes} onEdit={openEdit} onDelete={setDeletingRoute} />
      )}

      <RouteFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        stops={stops}
        initialRoute={editingRoute}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deletingRoute}
        title="Delete this route?"
        description={`"${deletingRoute?.name}" will be removed and no longer visible to commuters.`}
        confirmLabel="Delete"
        tone="danger"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeletingRoute(null)}
      />
    </div>
  );
}
