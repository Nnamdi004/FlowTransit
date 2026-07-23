import { Marker, Popup } from 'react-leaflet';
import { AlertTriangle } from 'lucide-react';
import type { Incident } from '@/types';
import { createMarkerIcon } from './markerIcon';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatFriendlyDate } from '@/utils/formatDate';

const colorBySeverity = { low: '#F59E0B', medium: '#EA580C', high: '#DC2626' };

const iconCache = {
  low: createMarkerIcon(<AlertTriangle size={14} />, colorBySeverity.low),
  medium: createMarkerIcon(<AlertTriangle size={14} />, colorBySeverity.medium),
  high: createMarkerIcon(<AlertTriangle size={14} />, colorBySeverity.high),
};

const statusTone = { open: 'danger', investigating: 'warning', resolved: 'success' } as const;

export function IncidentMarker({ incident }: { incident: Incident }) {
  return (
    <Marker position={[incident.lat, incident.lng]} icon={iconCache[incident.severity]}>
      <Popup>
        <p className="font-medium text-ink">{incident.title}</p>
        <p className="mt-1 text-xs text-ink-muted">{incident.description}</p>
        <div className="mt-2">
          <StatusPill label={incident.status} tone={statusTone[incident.status]} />
        </div>
        <p className="mt-1.5 text-xs text-ink-subtle">{formatFriendlyDate(incident.createdAt)}</p>
      </Popup>
    </Marker>
  );
}
