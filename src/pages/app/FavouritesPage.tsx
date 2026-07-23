import { useEffect, useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import type { FavouriteLocation } from '@/types';
import { addFavourite, listFavourites, removeFavourite } from '@/services/favouriteService';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { FavouriteCard } from '@/features/favourites/FavouriteCard';
import { AddFavouriteModal } from '@/features/favourites/AddFavouriteModal';

export function FavouritesPage() {
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

  const handleAdd = async ({ label, landmark }: { label: string; landmark: { lat: number; lng: number; area: string } }) => {
    if (!user) return;
    const created = await addFavourite({
      userId: user.id,
      label,
      lat: landmark.lat,
      lng: landmark.lng,
      area: landmark.area,
    });
    setFavourites((prev) => [...prev, created]);
    toast.success('Favourite added.');
  };

  const handleRemove = async (id: string) => {
    setFavourites((prev) => prev.filter((f) => f.id !== id));
    await removeFavourite(id);
    toast.info('Favourite removed.');
  };

  return (
    <div>
      <PageHeader
        title="Favourites"
        subtitle="Save the places you visit often for faster trip planning."
        action={
          <Button size="sm" iconLeft={<Plus className="size-4" />} onClick={() => setModalOpen(true)}>
            Add favourite
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : favourites.length === 0 ? (
        <EmptyState
          icon={<Heart className="size-6" />}
          title="No favourites yet"
          description="Save home, work or any spot you visit often to plan trips faster."
          action={{ label: 'Add your first favourite', onClick: () => setModalOpen(true) }}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((fav) => (
            <FavouriteCard key={fav.id} favourite={fav} onRemove={handleRemove} />
          ))}
        </div>
      )}

      <AddFavouriteModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAdd} />
    </div>
  );
}
