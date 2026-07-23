import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  message: z.string().min(10, 'Add a little more detail'),
});

type FormValues = z.infer<typeof schema>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function ContactSection() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await delay(500);
    toast.success("Thanks for reaching out — we'll get back to you soon.");
    reset();
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Get in touch</h2>
          <p className="mt-3 max-w-md text-ink-muted">
            Questions about this project or ideas for FlowTransit? Send us a message.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-ink-muted">
            <p className="flex items-center gap-2">
              <Mail className="size-4 text-primary-700" /> hello@flowtransit.ng
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-primary-700" /> +234 800 123 4567
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-primary-700" /> Lagos, Nigeria
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-3xl border border-ink/5 bg-white p-6 shadow-card" noValidate>
          <FormField label="Name" htmlFor="contact-name" error={errors.name?.message}>
            <Input id="contact-name" invalid={!!errors.name} {...register('name')} />
          </FormField>
          <FormField label="Email address" htmlFor="contact-email" error={errors.email?.message}>
            <Input id="contact-email" type="email" invalid={!!errors.email} {...register('email')} />
          </FormField>
          <FormField label="Message" htmlFor="contact-message" error={errors.message?.message}>
            <Textarea id="contact-message" rows={4} invalid={!!errors.message} {...register('message')} />
          </FormField>
          <Button type="submit" isLoading={isSubmitting} iconLeft={<Send className="size-4" />} className="self-start">
            Send message
          </Button>
        </form>
      </div>
    </section>
  );
}
