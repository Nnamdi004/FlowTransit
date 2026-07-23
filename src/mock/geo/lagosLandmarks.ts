import { haversineKm } from '@/utils/geo';

export interface LagosLandmark {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
}

/**
 * Hand-authored, approximate real-world coordinates for well-known Lagos
 * areas/landmarks. Used to power location search (trip planner, favourites,
 * incident pin-drop) without depending on a live geocoding service.
 */
export const lagosLandmarks: LagosLandmark[] = [
  { id: 'lm-cms', name: 'CMS, Lagos Island', area: 'Lagos Island', lat: 6.4531, lng: 3.3958 },
  { id: 'lm-marina', name: 'Marina Waterfront', area: 'Lagos Island', lat: 6.4515, lng: 3.3985 },
  { id: 'lm-balogun', name: 'Balogun Market', area: 'Lagos Island', lat: 6.4549, lng: 3.3903 },
  { id: 'lm-freedom-park', name: 'Freedom Park', area: 'Lagos Island', lat: 6.4508, lng: 3.3941 },
  { id: 'lm-obalende', name: 'Obalende', area: 'Obalende', lat: 6.4514, lng: 3.4079 },
  { id: 'lm-ikoyi', name: 'Falomo, Ikoyi', area: 'Ikoyi', lat: 6.4497, lng: 3.4278 },
  { id: 'lm-vi', name: 'Victoria Island', area: 'Victoria Island', lat: 6.4281, lng: 3.4219 },
  { id: 'lm-eko-atlantic', name: 'Eko Atlantic City', area: 'Victoria Island', lat: 6.4116, lng: 3.4189 },
  { id: 'lm-landmark-beach', name: 'Landmark Beach', area: 'Victoria Island', lat: 6.4267, lng: 3.4478 },
  { id: 'lm-lekki-phase1', name: 'Lekki Phase 1', area: 'Lekki', lat: 6.4422, lng: 3.4732 },
  { id: 'lm-lekki-conservation', name: 'Lekki Conservation Centre', area: 'Lekki', lat: 6.4396, lng: 3.5464 },
  { id: 'lm-ajah', name: 'Ajah', area: 'Ajah', lat: 6.4698, lng: 3.5852 },
  { id: 'lm-yaba', name: 'Yaba', area: 'Yaba', lat: 6.5095, lng: 3.3711 },
  { id: 'lm-unilag', name: 'University of Lagos (UNILAG)', area: 'Yaba', lat: 6.5158, lng: 3.3966 },
  { id: 'lm-surulere', name: 'Surulere', area: 'Surulere', lat: 6.4923, lng: 3.3546 },
  { id: 'lm-national-theatre', name: 'National Theatre, Iganmu', area: 'Surulere', lat: 6.4732, lng: 3.3697 },
  { id: 'lm-maryland', name: 'Maryland', area: 'Maryland', lat: 6.5711, lng: 3.3644 },
  { id: 'lm-ikeja', name: 'Ikeja GRA', area: 'Ikeja', lat: 6.6018, lng: 3.3515 },
  { id: 'lm-mmia', name: 'Murtala Muhammed International Airport', area: 'Ikeja', lat: 6.5774, lng: 3.3212 },
  { id: 'lm-oshodi', name: 'Oshodi Interchange', area: 'Oshodi', lat: 6.5558, lng: 3.3468 },
  { id: 'lm-mile2', name: 'Mile 2', area: 'Mile 2', lat: 6.4593, lng: 3.2955 },
  { id: 'lm-apapa', name: 'Apapa Port', area: 'Apapa', lat: 6.4432, lng: 3.3592 },
  { id: 'lm-festac', name: 'Festac Town', area: 'Festac', lat: 6.4667, lng: 3.2833 },
  { id: 'lm-ikorodu', name: 'Ikorodu Town', area: 'Ikorodu', lat: 6.6018, lng: 3.5106 },
  { id: 'lm-tarkwa-bay', name: 'Tarkwa Bay Beach', area: 'Tarkwa Bay', lat: 6.4004, lng: 3.3808 },
  { id: 'lm-badagry', name: 'Badagry', area: 'Badagry', lat: 6.4152, lng: 2.8823 },
  { id: 'lm-epe', name: 'Epe', area: 'Epe', lat: 6.5832, lng: 3.9852 },
];

/** Nearest known Lagos area name for an arbitrary coordinate (map pin-drop, GPS, etc). */
export function findNearestArea(lat: number, lng: number): string {
  let best = lagosLandmarks[0]!;
  let bestDist = Infinity;
  for (const lm of lagosLandmarks) {
    const dist = haversineKm({ lat, lng }, lm);
    if (dist < bestDist) {
      bestDist = dist;
      best = lm;
    }
  }
  return best.area;
}
