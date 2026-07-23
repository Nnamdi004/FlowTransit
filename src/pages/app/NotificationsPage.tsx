import { useMemo, useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { NotificationList } from '@/features/notifications/NotificationList';
import { useNotifications } from '@/hooks/useNotifications';

export function NotificationsPage() {
  const { notifications, unreadCount, isLoading, markRead, markAllRead } = useNotifications();
  const [tab, setTab] = useState<'all' | 'unread'>('all');

  const filtered = useMemo(
    () => (tab === 'unread' ? notifications.filter((n) => !n.read) : notifications),
    [notifications, tab],
  );

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on incidents, trips and account activity."
        action={
          unreadCount > 0 ? (
            <Button
              variant="outline"
              size="sm"
              iconLeft={<CheckCheck className="size-4" />}
              onClick={() => markAllRead()}
            >
              Mark all as read
            </Button>
          ) : undefined
        }
      />
      <Tabs
        className="mb-4"
        value={tab}
        onChange={(v) => setTab(v as typeof tab)}
        items={[
          { value: 'all', label: 'All', count: notifications.length },
          { value: 'unread', label: 'Unread', count: unreadCount },
        ]}
      />
      <NotificationList notifications={filtered} isLoading={isLoading} onRead={markRead} />
    </div>
  );
}
