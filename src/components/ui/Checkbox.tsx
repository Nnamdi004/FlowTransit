import { forwardRef, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, id, ...props },
  ref,
) {
  return (
    <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink">
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            'peer size-5 shrink-0 appearance-none rounded-md border border-ink/25 bg-white transition-colors',
            'checked:border-primary-700 checked:bg-primary-700',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
            className,
          )}
          {...props}
        />
        <Check
          className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100"
          aria-hidden
        />
      </span>
      {label}
    </label>
  );
});
