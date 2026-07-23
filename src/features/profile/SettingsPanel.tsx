import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { ChangePasswordForm } from './ChangePasswordForm';

export function SettingsPanel() {
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({ incidents: true, trips: true, product: false });

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preferences updated.');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-sm font-medium text-ink">Notification preferences</p>
        <div className="flex flex-col gap-3">
          <Checkbox
            id="pref-incidents"
            label="Alert me about incidents on my routes"
            checked={prefs.incidents}
            onChange={() => togglePref('incidents')}
          />
          <Checkbox
            id="pref-trips"
            label="Trip reminders and fare updates"
            checked={prefs.trips}
            onChange={() => togglePref('trips')}
          />
          <Checkbox
            id="pref-product"
            label="Product news and tips"
            checked={prefs.product}
            onChange={() => togglePref('product')}
          />
        </div>
      </div>

      <div className="border-t border-ink/5 pt-5">
        <p className="mb-3 text-sm font-medium text-ink">Change password</p>
        <ChangePasswordForm />
      </div>

      <div className="border-t border-ink/5 pt-5">
        <p className="mb-3 text-sm font-medium text-ink">Account</p>
        <Button
          variant="outline"
          iconLeft={<LogOut className="size-4" />}
          onClick={() => {
            logout();
            navigate('/login', { replace: true });
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
