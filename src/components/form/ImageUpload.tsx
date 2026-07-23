import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MAX_SIZE_BYTES = 4 * 1024 * 1024;

interface ImageUploadProps {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  onError?: (message: string) => void;
}

export function ImageUpload({ value, onChange, onError }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      onError?.('Please choose an image file.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      onError?.('Image must be smaller than 4MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  if (value) {
    return (
      <div className="relative w-fit">
        <img src={value} alt="Attached preview" className="h-32 w-full max-w-xs rounded-xl object-cover" />
        <button
          type="button"
          onClick={() => {
            onChange(undefined);
            if (inputRef.current) inputRef.current.value = '';
          }}
          aria-label="Remove image"
          className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-ink/70 text-white hover:bg-ink"
        >
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <Button type="button" variant="outline" size="sm" iconLeft={<ImagePlus className="size-4" />} onClick={() => inputRef.current?.click()}>
        Add photo
      </Button>
    </div>
  );
}
