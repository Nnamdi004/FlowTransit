import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="mb-1 text-lg font-semibold text-ink">Forgot your password?</h1>
      <p className="mb-6 text-sm text-ink-muted">
        Enter the email address on your account and we'll send you a reset link.
      </p>
      <ForgotPasswordForm />
      <Link
        to="/login"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline"
      >
        <ArrowLeft className="size-3.5" /> Back to sign in
      </Link>
    </div>
  );
}
