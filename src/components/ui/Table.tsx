import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T>({ columns, data, rowKey, onRowClick, className }: TableProps<T>) {
  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-ink/5', className)}>
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/5 bg-surface-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'border-b border-ink/5 last:border-0',
                onRowClick && 'cursor-pointer hover:bg-surface-muted',
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 align-middle text-ink', col.className)}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
