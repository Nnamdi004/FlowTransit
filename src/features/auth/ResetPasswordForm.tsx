import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useToast } from '@/hooks/useToast';
import * as authService from '@/services/authService';

const schema = z
  .object({
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your new password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export function ResetPasswordForm({ token }: { token: string | null }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      setFormError('This reset link is invalid or has expired.');
      return;
    }
    setFormError(null);
    try {
      await authService.resetPassword(token, values.password);
      toast.success('Password updated — sign in with your new password.');
      navigate('/login', { replace: true });
    } catch {
      setFormError('This reset link is invalid or has expired.');
    }
  };

  if (!token) {
    return (
      <Alert
        variant="error"
        title="Invalid reset link"
        description="Request a new password reset link and try again."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <FormField label="New password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          iconLeft={<Lock className="size-4" />}
          invalid={!!errors.password}
          {...register('password')}
        />
      </FormField>
      <FormField label="Confirm new password" htmlFor="confirmPassword" error={errors.confirmPassword?.message}>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your new password"
          iconLeft={<Lock className="size-4" />}
          invalid={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
      </FormField>
      {formError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{formError}</p>}
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Reset password
      </Button>
    </form>
  );
}
