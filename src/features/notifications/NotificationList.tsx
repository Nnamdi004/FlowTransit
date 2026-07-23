import type { AppNotification } from '@/types';
import { NotificationItem } from './NotificationItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { BellOff } from 'lucide-react';

interface NotificationListProps {
  notifications: AppNotification[];
  isLoading: boolean;
  onRead: (id: string) => void;
}

export function NotificationList({ notifications, isLoading, onRead }: NotificationListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <EmptyState icon={<BellOff className="size-6" />} title="You're all caught up" description="No notifications here." />
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} onRead={onRead} />
      ))}
    </div>
  );
}
