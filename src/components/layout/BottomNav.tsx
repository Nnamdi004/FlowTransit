import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { bottomNavItems } from './navConfig';

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/5 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] md:hidden">
      {bottomNavItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors',
              isActive ? 'text-primary-700' : 'text-ink-subtle',
            )
          }
        >
          <Icon className="size-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
