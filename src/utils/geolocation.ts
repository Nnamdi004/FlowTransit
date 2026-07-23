import type { LatLng } from '@/types';

/**
 * Tries the browser Geolocation API briefly; falls back to a provided mock
 * location if permission is denied, unavailable, or it doesn't resolve in time.
 */
export function getCurrentPositionOrFallback(fallback: LatLng, timeoutMs = 4000): Promise<LatLng> {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      resolve(fallback);
      return;
    }
    const timer = window.setTimeout(() => resolve(fallback), timeoutMs);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        window.clearTimeout(timer);
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        window.clearTimeout(timer);
        resolve(fallback);
      },
      { timeout: timeoutMs, maximumAge: 60_000 },
    );
  });
}
