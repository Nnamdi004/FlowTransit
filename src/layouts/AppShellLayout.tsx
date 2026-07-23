import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { appNavItems } from '@/components/layout/navConfig';
import { SOSButton } from '@/features/emergency/SOSButton';
import { ActiveSOSBanner } from '@/features/emergency/ActiveSOSBanner';

export function AppShellLayout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar navItems={appNavItems} homeTo="/app/dashboard" />
        <ActiveSOSBanner />
        <main className="flex-1 px-4 pb-24 pt-5 sm:px-6 sm:pb-8 lg:px-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
      <SOSButton />
    </div>
  );
}
