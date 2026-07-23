import { useState } from 'react';
import { Siren } from 'lucide-react';
import { SOSModal } from './SOSModal';
import { useSOS } from '@/hooks/useSOS';

export function SOSButton() {
  const [open, setOpen] = useState(false);
  const { activeAlert } = useSOS();

  if (activeAlert) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Send emergency SOS alert"
        className="fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full bg-danger px-4 py-3 text-sm font-semibold text-white shadow-card-hover transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
      >
        <Siren className="size-5" />
        <span className="hidden sm:inline">SOS</span>
      </button>
      <SOSModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
