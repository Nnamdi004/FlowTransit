import { cn } from '@/utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-ink/8', className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
      <Skeleton className="mb-3 h-4 w-1/3" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-3 w-1/6" />
    </div>
  );
}
