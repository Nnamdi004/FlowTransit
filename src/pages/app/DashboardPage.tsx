import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Heart,
  MapPinned,
  Navigation,
  Route as RouteIcon,
} from 'lucide-react';
import type { FavouriteLocation, Trip } from '@/types';
import { listTrips } from '@/services/tripService';
import { listFavourites } from '@/services/favouriteService';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatFriendlyDate } from '@/utils/formatDate';
import { formatNaira } from '@/utils/formatDistance';

const quickActions = [
  { to: '/app/plan', label: 'Plan a trip', icon: Navigation, tone: 'bg-primary-50 text-primary-700' },
  { to: '/app/map', label: 'View live map', icon: MapPinned, tone: 'bg-secondary-50 text-secondary-700' },
  { to: '/app/incidents', label: 'Report incident', icon: AlertTriangle, tone: 'bg-red-50 text-danger' },
  { to: '/app/routes', label: 'Browse routes', icon: RouteIcon, tone: 'bg-accent-50 text-accent-700' },
];

export function DashboardPage() {
  const { user } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [favourites, setFavourites] = useState<FavouriteLocation[]>([]);

  useEffect(() => {
    if (!user) return;
    listTrips(user.id).then(setTrips);
    listFavourites(user.id).then(setFavourites);
  }, [user]);

  const firstName = user?.name.split(' ')[0] ?? 'there';
  const recentTrips = trips.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink sm:text-2xl">Hi {firstName}, where to today?</h1>
        <p className="mt-1 text-sm text-ink-muted">Here's what's happening across your Lagos commute.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map(({ to, label, icon: Icon, tone }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link to={to}>
              <Card hover className="flex h-full flex-col items-start gap-3">
                <span className={`flex size-10 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="size-5" />
                </span>
                <p className="text-sm font-medium text-ink">{label}</p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-medium text-ink">Recent trips</p>
            <Link to="/app/history" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          {recentTrips.length === 0 ? (
            <EmptyState
              icon={<Navigation className="size-6" />}
              title="No trips yet"
              description="Plan your first trip to see it here."
              action={{ label: 'Plan a trip', onClick: () => navigate('/app/plan') }}
            />
          ) : (
            <div className="flex flex-col divide-y divide-ink/5">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {trip.originLabel} → {trip.destinationLabel}
                    </p>
                    <p className="text-xs text-ink-subtle">{formatFriendlyDate(trip.createdAt)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {trip.selectedOption && (
                      <span className="text-sm text-ink-muted">{formatNaira(trip.selectedOption.fareNGN)}</span>
                    )}
                    <StatusPill
                      label={trip.status}
                      tone={trip.status === 'completed' ? 'success' : trip.status === 'planned' ? 'info' : 'neutral'}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <p className="font-medium text-ink">Notifications</p>
            <Link to="/app/notifications" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline">
              {unreadCount > 0 ? `${unreadCount} unread` : 'View all'}
            </Link>
          </div>
          {recentNotifications.length === 0 ? (
            <p className="text-sm text-ink-subtle">You're all caught up.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentNotifications.map((n) => (
                <div key={n.id} className="flex items-start gap-2">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${n.read ? 'bg-ink/15' : 'bg-primary-600'}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink">{n.title}</p>
                    <p className="text-xs text-ink-subtle">{formatFriendlyDate(n.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium text-ink">Favourite places</p>
          <Link to="/app/favourites" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline">
            Manage <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {favourites.length === 0 ? (
          <EmptyState
            icon={<Heart className="size-6" />}
            title="No favourites saved"
            description="Save home, work or frequent spots for one-tap planning."
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {favourites.map((fav) => (
              <span
                key={fav.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-sm text-ink"
              >
                <Heart className="size-3.5 text-accent-600" /> {fav.label}
              </span>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
