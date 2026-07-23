import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, User as UserIcon } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { AvatarUpload } from './AvatarUpload';
import { AccountDetails } from './AccountDetails';

const profileSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().min(7, 'Enter a valid phone number').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '', phone: user?.phone ?? '' },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    await updateProfile(values);
    toast.success('Profile updated.');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <AvatarUpload />
          <div>
            <p className="font-medium text-ink">{user.name}</p>
            <p className="text-sm text-ink-subtle capitalize">{user.role} account</p>
          </div>
        </div>

        <FormField label="Full name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" iconLeft={<UserIcon className="size-4" />} invalid={!!errors.name} {...register('name')} />
        </FormField>

        <FormField label="Email address" htmlFor="email" hint="Email cannot be changed for this demo account.">
          <Input id="email" value={user.email} disabled iconLeft={<Mail className="size-4" />} />
        </FormField>

        <FormField label="Phone number" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" iconLeft={<Phone className="size-4" />} invalid={!!errors.phone} {...register('phone')} />
        </FormField>

        <Button type="submit" isLoading={isSubmitting} disabled={!isDirty} className="self-start">
          Save changes
        </Button>
      </form>

      <AccountDetails />
    </div>
  );
}
