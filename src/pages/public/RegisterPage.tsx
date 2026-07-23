import { Link } from 'react-router-dom';
import { RegisterForm } from '@/features/auth/RegisterForm';

export function RegisterPage() {
  return (
    <div>
      <h1 className="mb-1 text-lg font-semibold text-ink">Create your account</h1>
      <p className="mb-6 text-sm text-ink-muted">
        Plan smarter trips across Lagos road and water transport.
      </p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-ink-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
