import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSOS } from '@/hooks/useSOS';
import { useToast } from '@/hooks/useToast';

export function ActiveSOSBanner() {
  const { activeAlert, cancel } = useSOS();
  const toast = useToast();
  const [isCancelling, setIsCancelling] = useState(false);

  if (!activeAlert) return null;

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await cancel();
      toast.info('SOS alert marked as resolved.');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-danger px-4 py-2.5 text-white sm:px-6">
      <div className="flex min-w-0 items-center gap-2.5">
        <ShieldAlert className="size-4 shrink-0" />
        <p className="truncate text-sm font-medium">
          {activeAlert.status === 'acknowledged'
            ? `Your SOS alert is being handled by an administrator (${activeAlert.area})`
            : `Your SOS alert near ${activeAlert.area} is active — help has been notified`}
        </p>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={handleCancel}
        isLoading={isCancelling}
        className="shrink-0 border-white/40 bg-transparent text-white hover:bg-white/10"
      >
        I&apos;m safe now
      </Button>
    </div>
  );
}
