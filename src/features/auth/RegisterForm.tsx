import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterFormValues) => {
    setFormError(null);
    try {
      const newUser = await registerUser(values);
      toast.success(`Welcome to FlowTransit, ${newUser.name.split(' ')[0]}!`);
      navigate('/app/dashboard', { replace: true });
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Something went wrong. Please try again.';
      setFormError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <FormField label="Full name" htmlFor="name" error={errors.name?.message}>
        <Input
          id="name"
          placeholder="Ada Okafor"
          iconLeft={<User className="size-4" />}
          invalid={!!errors.name}
          {...register('name')}
        />
      </FormField>

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

      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          iconLeft={<Lock className="size-4" />}
          invalid={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <FormField
        label="Confirm password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          iconLeft={<Lock className="size-4" />}
          invalid={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
      </FormField>

      {formError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{formError}</p>
      )}

      <Button type="submit" isLoading={isSubmitting} className="mt-1 w-full">
        Create account
      </Button>
    </form>
  );
}
