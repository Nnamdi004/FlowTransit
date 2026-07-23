import { useEffect, useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import type { FavouriteLocation } from '@/types';
import { addFavourite, listFavourites, removeFavourite } from '@/services/favouriteService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { FavouriteCard } from '@/features/favourites/FavouriteCard';
import { AddFavouriteModal } from '@/features/favourites/AddFavouriteModal';

export function SavedLocationsPanel() {
  const { user } = useAuth();
  const toast = useToast();
  const [favourites, setFavourites] = useState<FavouriteLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    listFavourites(user.id).then((data) => {
      setFavourites(data);
      setIsLoading(false);
    });
  }, [user]);

  const handleAdd = async ({
    label,
    landmark,
  }: {
    label: string;
    landmark: { lat: number; lng: number; area: string };
  }) => {
    if (!user) return;
    const created = await addFavourite({
      userId: user.id,
      label,
      lat: landmark.lat,
      lng: landmark.lng,
      area: landmark.area,
    });
    setFavourites((prev) => [...prev, created]);
    toast.success('Saved location added.');
  };

  const handleRemove = async (id: string) => {
    setFavourites((prev) => prev.filter((f) => f.id !== id));
    await removeFavourite(id);
    toast.info('Saved location removed.');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">Locations you've saved for faster trip planning.</p>
        <Button size="sm" iconLeft={<Plus className="size-4" />} onClick={() => setModalOpen(true)}>
          Add
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : favourites.length === 0 ? (
        <EmptyState
          icon={<Heart className="size-6" />}
          title="No saved locations yet"
          action={{ label: 'Add a location', onClick: () => setModalOpen(true) }}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {favourites.map((fav) => (
            <FavouriteCard key={fav.id} favourite={fav} onRemove={handleRemove} />
          ))}
        </div>
      )}

      <AddFavouriteModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
}
