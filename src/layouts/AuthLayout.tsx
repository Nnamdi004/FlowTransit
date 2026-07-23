import { Outlet } from 'react-router-dom';
import { Route as RouteIcon } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-surface to-secondary-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-700 text-white shadow-soft">
            <RouteIcon className="size-6" />
          </span>
          <span className="text-xl font-semibold text-ink">FlowTransit</span>
          <span className="text-sm text-ink-muted">Smart transit for Lagos, by road and water</span>
        </div>
        <div className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card-hover sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
