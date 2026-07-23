import { useEffect, useState } from 'react';
import type { PublicUser } from '@/types';
import { listUsers, setUserActive } from '@/services/userService';
import { useToast } from '@/hooks/useToast';
import { PageHeader } from '@/components/layout/PageHeader';
import { SearchInput } from '@/components/ui/SearchInput';
import { SkeletonRow } from '@/components/ui/Skeleton';
import { UsersTable } from '@/features/admin/users/UsersTable';
import { UserDetailDrawer } from '@/features/admin/users/UserDetailDrawer';
import { useDebounce } from '@/hooks/useDebounce';

export function AdminUsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const [selected, setSelected] = useState<PublicUser | null>(null);

  useEffect(() => {
    listUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = users.filter((u) => {
    const q = debouncedQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const handleToggleActive = async (user: PublicUser) => {
    const updated = await setUserActive(user.id, !user.isActive);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setSelected(updated);
    toast.success(`${updated.name} ${updated.isActive ? 'reactivated' : 'deactivated'}.`);
  };

  return (
    <div>
      <PageHeader title="Users" subtitle="All commuters and admins registered on FlowTransit." />
      <SearchInput value={query} onChange={setQuery} placeholder="Search by name or email…" className="mb-4 sm:w-80" />

      {isLoading ? (
        <div className="rounded-2xl border border-ink/5 bg-white">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : (
        <UsersTable users={filtered} onRowClick={setSelected} />
      )}

      <UserDetailDrawer user={selected} onClose={() => setSelected(null)} onToggleActive={handleToggleActive} />
    </div>
  );
}
