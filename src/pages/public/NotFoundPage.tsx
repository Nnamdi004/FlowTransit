import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <Compass className="size-7" />
      </span>
      <div>
        <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
        <p className="mt-1 text-sm text-ink-muted">
          The route you're looking for doesn't exist or has moved.
        </p>
      </div>
      <Button onClick={() => navigate('/')}>Back to home</Button>
    </div>
  );
}
