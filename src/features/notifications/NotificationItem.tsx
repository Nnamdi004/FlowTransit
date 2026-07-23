import { Link } from 'react-router-dom';
import { AlertTriangle, Info, Navigation } from 'lucide-react';
import type { AppNotification } from '@/types';
import { formatFriendlyDate } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

const iconByType = {
  incident: AlertTriangle,
  trip: Navigation,
  system: Info,
};

interface NotificationItemProps {
  notification: AppNotification;
  onRead: (id: string) => void;
}

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const Icon = iconByType[notification.type];

  const content = (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-ink/5 bg-white p-4 transition-colors',
        !notification.read && 'bg-primary-50/40',
      )}
    >
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-xl',
          notification.type === 'incident'
            ? 'bg-red-50 text-danger'
            : notification.type === 'trip'
              ? 'bg-primary-50 text-primary-700'
              : 'bg-ink/5 text-ink-muted',
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-ink">{notification.title}</p>
          {!notification.read && <span className="mt-1 size-2 shrink-0 rounded-full bg-primary-600" />}
        </div>
        <p className="mt-0.5 text-sm text-ink-muted">{notification.message}</p>
        <p className="mt-1.5 text-xs text-ink-subtle">{formatFriendlyDate(notification.createdAt)}</p>
      </div>
    </div>
  );

  if (notification.linkTo) {
    return (
      <Link to={notification.linkTo} onClick={() => onRead(notification.id)} className="block">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onRead(notification.id)} className="block w-full text-left">
      {content}
    </button>
  );
}
