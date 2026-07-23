import { Checkbox } from '@/components/ui/Checkbox';

export interface MapFilters {
  road: boolean;
  ferry: boolean;
  incidents: boolean;
  majorRoads: boolean;
}

interface MapFilterPanelProps {
  filters: MapFilters;
  onChange: (filters: MapFilters) => void;
}

export function MapFilterPanel({ filters, onChange }: MapFilterPanelProps) {
  return (
    <div className="absolute right-4 top-4 z-[400] flex flex-col gap-2 rounded-xl bg-white/95 p-3 shadow-card backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Show on map</p>
      <Checkbox
        id="filter-road"
        label="Road / BRT routes"
        checked={filters.road}
        onChange={(e) => onChange({ ...filters, road: e.target.checked })}
      />
      <Checkbox
        id="filter-ferry"
        label="Ferry routes"
        checked={filters.ferry}
        onChange={(e) => onChange({ ...filters, ferry: e.target.checked })}
      />
      <Checkbox
        id="filter-incidents"
        label="Incidents"
        checked={filters.incidents}
        onChange={(e) => onChange({ ...filters, incidents: e.target.checked })}
      />
      <Checkbox
        id="filter-major-roads"
        label="Major roads"
        checked={filters.majorRoads}
        onChange={(e) => onChange({ ...filters, majorRoads: e.target.checked })}
      />
    </div>
  );
}
