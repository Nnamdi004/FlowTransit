import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    try {
      const loggedInUser = await login(values.email, values.password);
      toast.success(`Welcome back, ${loggedInUser.name.split(' ')[0]}!`);
      navigate(loggedInUser.role === 'admin' ? '/admin/dashboard' : '/app/dashboard', {
        replace: true,
      });
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Something went wrong. Please try again.';
      setFormError(message);
    }
  };

  if (user) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <FormField label="Email address" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          iconLeft={<Mail className="size-4" />}
          invalid={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="password"
        error={errors.password?.message}
        labelExtra={
          <Link to="/forgot-password" className="text-xs font-medium text-primary-700 hover:underline">
            Forgot password?
          </Link>
        }
      >
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          iconLeft={<Lock className="size-4" />}
          invalid={!!errors.password}
          {...register('password')}
        />
      </FormField>

      {formError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{formError}</p>
      )}

      <Button type="submit" isLoading={isSubmitting} className="mt-1 w-full">
        Sign in
      </Button>

      <div className="rounded-xl bg-surface-muted px-3.5 py-3 text-xs text-ink-muted">
        <p className="font-medium text-ink">Demo accounts</p>
        <p className="mt-1">Admin: admin@flowtransit.ng</p>
        <p>Commuter: user@flowtransit.ng</p>
        <p className="mt-1">Password for both: password123</p>
      </div>
    </form>
  );
}
