import { Briefcase, Dumbbell, GraduationCap, Home, MapPin, Trash2 } from 'lucide-react';
import type { FavouriteLocation } from '@/types';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';

const iconMap: Record<string, typeof MapPin> = {
  home: Home,
  briefcase: Briefcase,
  dumbbell: Dumbbell,
  'graduation-cap': GraduationCap,
};

interface FavouriteCardProps {
  favourite: FavouriteLocation;
  onRemove: (id: string) => void;
}

export function FavouriteCard({ favourite, onRemove }: FavouriteCardProps) {
  const Icon = (favourite.icon && iconMap[favourite.icon]) || MapPin;

  return (
    <Card hover className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{favourite.label}</p>
        <p className="truncate text-xs text-ink-subtle">{favourite.area}</p>
      </div>
      <IconButton
        icon={<Trash2 className="size-4" />}
        label={`Remove ${favourite.label}`}
        variant="ghost"
        size="sm"
        onClick={() => onRemove(favourite.id)}
        className="shrink-0 text-ink-subtle hover:text-danger"
      />
    </Card>
  );
}
