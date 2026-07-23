import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { ProfileForm } from '@/features/profile/ProfileForm';
import { SettingsPanel } from '@/features/profile/SettingsPanel';
import { SavedLocationsPanel } from '@/features/profile/SavedLocationsPanel';

export function ProfilePage() {
  const [tab, setTab] = useState<'profile' | 'locations' | 'settings'>('profile');

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Profile" subtitle="Manage your account details and preferences." />
      <Tabs
        className="mb-4"
        value={tab}
        onChange={(v) => setTab(v as typeof tab)}
        items={[
          { value: 'profile', label: 'Profile' },
          { value: 'locations', label: 'Saved locations' },
          { value: 'settings', label: 'Settings' },
        ]}
      />
      <Card>
        {tab === 'profile' && <ProfileForm />}
        {tab === 'locations' && <SavedLocationsPanel />}
        {tab === 'settings' && <SettingsPanel />}
      </Card>
    </div>
  );
}
