import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

const MAX_SIZE_BYTES = 4 * 1024 * 1024;

export function AvatarUpload() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!user) return null;

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error('Image must be smaller than 4MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      setIsUploading(true);
      try {
        await updateProfile({ avatarUrl: reader.result as string });
        toast.success('Profile picture updated.');
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <Avatar name={user.name} imageUrl={user.avatarUrl} size="lg" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="Change profile picture"
        disabled={isUploading}
        className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary-700 text-white shadow-soft hover:bg-primary-800"
      >
        {isUploading ? <Spinner className="size-3.5" /> : <Camera className="size-3.5" />}
      </button>
    </div>
  );
}
