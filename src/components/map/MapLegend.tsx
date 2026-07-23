export function MapLegend() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-[400] rounded-xl bg-white/95 p-3 text-xs shadow-card backdrop-blur">
      <p className="mb-1.5 font-medium text-ink">Legend</p>
      <div className="flex flex-col gap-1 text-ink-muted">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-full bg-primary-700" /> Road / BRT route
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-full border-t-2 border-dashed border-secondary-600" /> Ferry route
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-danger" /> Incident
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded-full bg-ink/30" /> Major road
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary-700" /> Your location (mock)
        </span>
      </div>
    </div>
  );
}
