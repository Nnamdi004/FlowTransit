import { useState } from 'react';
import { Mail, Phone, ShieldBan, ShieldCheck } from 'lucide-react';
import type { PublicUser } from '@/types';
import { Drawer } from '@/components/ui/Drawer';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import { formatDateTime } from '@/utils/formatDate';

interface UserDetailDrawerProps {
  user: PublicUser | null;
  onClose: () => void;
  onToggleActive: (user: PublicUser) => Promise<void>;
}

export function UserDetailDrawer({ user, onClose, onToggleActive }: UserDetailDrawerProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await onToggleActive(user);
      setConfirmOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Drawer open={!!user} onClose={onClose} title="User details">
        {user && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} size="lg" />
              <div>
                <p className="font-semibold text-ink">{user.name}</p>
                <Badge color={user.role === 'admin' ? 'primary' : 'neutral'}>{user.role}</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className="flex items-center gap-2 text-ink-muted">
                <Mail className="size-4" /> {user.email}
              </p>
              {user.phone && (
                <p className="flex items-center gap-2 text-ink-muted">
                  <Phone className="size-4" /> {user.phone}
                </p>
              )}
              <p className="text-xs text-ink-subtle">Joined {formatDateTime(user.createdAt)}</p>
            </div>

            <div className="border-t border-ink/5 pt-4">
              <Button
                variant={user.isActive ? 'danger' : 'primary'}
                iconLeft={user.isActive ? <ShieldBan className="size-4" /> : <ShieldCheck className="size-4" />}
                onClick={() => setConfirmOpen(true)}
                className="w-full"
              >
                {user.isActive ? 'Deactivate account' : 'Reactivate account'}
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {user && (
        <ConfirmDialog
          open={confirmOpen}
          title={user.isActive ? 'Deactivate this user?' : 'Reactivate this user?'}
          description={
            user.isActive
              ? `${user.name} will no longer be able to sign in to FlowTransit.`
              : `${user.name} will regain access to their FlowTransit account.`
          }
          confirmLabel={user.isActive ? 'Deactivate' : 'Reactivate'}
          tone={user.isActive ? 'danger' : 'primary'}
          isLoading={isSubmitting}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}
