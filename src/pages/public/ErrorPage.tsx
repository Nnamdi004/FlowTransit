import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const status = isRouteErrorResponse(error) ? error.status : undefined;
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred.';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-red-50 text-danger">
        <AlertOctagon className="size-7" />
      </span>
      <div>
        <h1 className="text-2xl font-semibold text-ink">{status ? `Error ${status}` : 'Something went wrong'}</h1>
        <p className="mt-1 max-w-md text-sm text-ink-muted">{message}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button onClick={() => navigate('/')}>Back to home</Button>
      </div>
    </div>
  );
}
