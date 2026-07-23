import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth/LoginForm';

export function LoginPage() {
  return (
    <div>
      <h1 className="mb-1 text-lg font-semibold text-ink">Welcome back</h1>
      <p className="mb-6 text-sm text-ink-muted">Sign in to continue planning your journeys.</p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-ink-muted">
        New to FlowTransit?{' '}
        <Link to="/register" className="font-medium text-primary-700 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
