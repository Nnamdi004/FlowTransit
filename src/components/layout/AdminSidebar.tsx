import { NavLink } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';
import { adminNavItems } from './navConfig';

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/5 bg-white md:flex">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-ink text-white">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">FlowTransit</p>
          <p className="text-xs text-ink-subtle">Admin console</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {adminNavItems.map(({ to, label, icon: Icon }) => (
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
