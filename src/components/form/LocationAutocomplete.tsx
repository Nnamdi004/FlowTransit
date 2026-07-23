import { useMemo, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { lagosLandmarks, type LagosLandmark } from '@/mock/geo/lagosLandmarks';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (landmark: LagosLandmark) => void;
  placeholder?: string;
  id?: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  id,
}: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return lagosLandmarks.slice(0, 6);
    return lagosLandmarks
      .filter(
        (lm) => lm.name.toLowerCase().includes(query) || lm.area.toLowerCase().includes(query),
      )
      .slice(0, 6);
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Input
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        iconLeft={<MapPin className="size-4" />}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-ink/10 bg-white py-1 shadow-card-hover"
        >
          {suggestions.map((lm) => (
            <li key={lm.id}>
              <button
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => {
                  onSelect(lm);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm hover:bg-surface-muted',
                )}
              >
                <MapPin className="size-4 shrink-0 text-primary-600" />
                <span>
                  <span className="block text-ink">{lm.name}</span>
                  <span className="block text-xs text-ink-subtle">{lm.area}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
