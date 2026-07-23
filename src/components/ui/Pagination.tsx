import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from './IconButton';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 px-1 py-2">
      <p className="text-xs text-ink-muted">
        Page {page} of {pageCount}
      </p>
      <div className="flex items-center gap-2">
        <IconButton
          icon={<ChevronLeft className="size-4" />}
          label="Previous page"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        <IconButton
          icon={<ChevronRight className="size-4" />}
          label="Next page"
          variant="outline"
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        />
      </div>
    </div>
  );
}
