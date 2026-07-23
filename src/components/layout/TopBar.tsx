import { useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, Route as RouteIcon, User } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { Avatar } from '@/components/ui/Avatar';
import { Drawer } from '@/components/ui/Drawer';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/utils/cn';
import type { NavItem } from './navConfig';

interface TopBarProps {
  navItems: NavItem[];
  homeTo: string;
  showNotifications?: boolean;
}

export function TopBar({ navItems, homeTo, showNotifications = true }: TopBarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink/5 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <IconButton
          icon={<Menu className="size-5" />}
          label="Open menu"
          variant="ghost"
          className="md:hidden"
          onClick={() => setDrawerOpen(true)}
        />
        <Link to={homeTo} className="flex items-center gap-2 md:hidden">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary-700 text-white">
            <RouteIcon className="size-4" />
          </span>
          <span className="font-semibold text-ink">FlowTransit</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {showNotifications && (
          <Link to="/app/notifications" className="relative">
            <IconButton icon={<Bell className="size-5" />} label="Notifications" variant="ghost" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
        )}

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full p-1 hover:bg-surface-muted"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <Avatar name={user?.name ?? '?'} size="sm" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-ink/5 bg-white py-1.5 shadow-card-hover">
                <div className="px-3.5 py-2">
                  <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
                  <p className="truncate text-xs text-ink-subtle">{user?.email}</p>
                </div>
                <div className="my-1 border-t border-ink/5" />
                {user?.role === 'user' && (
                  <Link
                    to="/app/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-sm text-ink hover:bg-surface-muted"
                  >
                    <User className="size-4" /> Profile
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                    navigate('/login', { replace: true });
                  }}
                  className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-danger hover:bg-red-50"
                >
                  <LogOut className="size-4" /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="FlowTransit">
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink-muted hover:bg-surface-muted hover:text-ink',
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
