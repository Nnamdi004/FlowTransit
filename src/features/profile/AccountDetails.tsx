import { ShieldCheck, Calendar, BadgeCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { formatShortDate } from '@/utils/formatDate';

export function AccountDetails() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="grid grid-cols-1 gap-3 border-t border-ink/5 pt-5 sm:grid-cols-3">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <ShieldCheck className="size-4" />
        </span>
        <div>
          <p className="text-xs text-ink-subtle">Role</p>
          <p className="text-sm font-medium capitalize text-ink">{user.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-secondary-50 text-secondary-700">
          <Calendar className="size-4" />
        </span>
        <div>
          <p className="text-xs text-ink-subtle">Member since</p>
          <p className="text-sm font-medium text-ink">{formatShortDate(user.createdAt)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
          <BadgeCheck className="size-4" />
        </span>
        <div>
          <p className="text-xs text-ink-subtle">Account status</p>
          <p className="text-sm font-medium text-ink">{user.isActive ? 'Active' : 'Deactivated'}</p>
        </div>
      </div>
    </div>
  );
}
