import { useSearchParams } from 'react-router-dom';
import { ResetPasswordForm } from '@/features/auth/ResetPasswordForm';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      <h1 className="mb-1 text-lg font-semibold text-ink">Set a new password</h1>
      <p className="mb-6 text-sm text-ink-muted">Choose a new password for your FlowTransit account.</p>
      <ResetPasswordForm token={token} />
    </div>
  );
}
