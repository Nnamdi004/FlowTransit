import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, iconLeft, invalid, ...props },
  ref,
) {
  return (
    <div className="relative">
      {iconLeft && (
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-subtle">
          {iconLeft}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-xl border border-ink/15 bg-white px-3.5 text-sm text-ink placeholder:text-ink-subtle transition-colors',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30',
          'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-subtle',
          iconLeft && 'pl-10',
          invalid && 'border-danger focus:border-danger focus:ring-danger/20',
          className,
        )}
        {...props}
      />
    </div>
  );
});
