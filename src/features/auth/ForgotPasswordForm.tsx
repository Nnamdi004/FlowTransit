import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MoveRight } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import * as authService from '@/services/authService';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [demoLink, setDemoLink] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    try {
      const { demoResetToken } = await authService.forgotPassword(values.email);
      setSent(true);
      setDemoLink(demoResetToken ? `/reset-password?token=${demoResetToken}` : null);
    } catch {
      setFormError('Something went wrong. Please try again.');
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-4">
        <Alert
          variant="success"
          title="Check your email"
          description="If an account exists for that address, we've sent a link to reset your password."
        />
        {demoLink && (
          <div className="rounded-xl bg-surface-muted px-3.5 py-3 text-sm text-ink-muted">
            <p className="mb-2 font-medium text-ink">No email server in this demo</p>
            <p className="mb-2">Use this link to continue the reset flow as if you'd clicked the emailed link:</p>
            <Link
              to={demoLink}
              className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
            >
              Continue to reset password <MoveRight className="size-3.5" />
            </Link>
          </div>
        )}
      </div>
    );
  }

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
      {formError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{formError}</p>}
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Send reset link
      </Button>
    </form>
  );
}
