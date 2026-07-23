import { NavLink } from 'react-router-dom';
import { Route as RouteIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { appNavItems } from './navConfig';

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/5 bg-white md:flex">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary-700 text-white">
          <RouteIcon className="size-5" />
        </span>
        <span className="text-lg font-semibold text-ink">FlowTransit</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {appNavItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
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
    </aside>
  );
}
