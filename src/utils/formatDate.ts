import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export function formatDateTime(iso: string): string {
  return format(new Date(iso), 'd MMM yyyy, h:mm a');
}

export function formatShortDate(iso: string): string {
  return format(new Date(iso), 'd MMM yyyy');
}

export function formatRelativeTime(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
}

export function formatFriendlyDate(iso: string): string {
  const date = new Date(iso);
  if (isToday(date)) return `Today, ${format(date, 'h:mm a')}`;
  if (isYesterday(date)) return `Yesterday, ${format(date, 'h:mm a')}`;
  return format(date, 'd MMM, h:mm a');
}
