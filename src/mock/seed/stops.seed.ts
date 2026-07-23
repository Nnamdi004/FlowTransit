import type { Stop } from '@/types';

export const stopsSeed: Stop[] = [
  // Road / BRT stops
  { id: 'stop-cms', name: 'CMS Bus Terminal', mode: 'road', lat: 6.4531, lng: 3.3958, area: 'Lagos Island' },
  { id: 'stop-obalende', name: 'Obalende Bus Stop', mode: 'road', lat: 6.4514, lng: 3.4079, area: 'Obalende' },
  { id: 'stop-falomo', name: 'Falomo', mode: 'road', lat: 6.4508, lng: 3.4275, area: 'Ikoyi' },
  { id: 'stop-lekki-phase1', name: 'Lekki Phase 1 Gate', mode: 'road', lat: 6.4422, lng: 3.4732, area: 'Lekki' },
  { id: 'stop-ajah', name: 'Ajah Bus Stop', mode: 'road', lat: 6.4698, lng: 3.5852, area: 'Ajah' },
  { id: 'stop-yaba', name: 'Yaba Bus Stop', mode: 'road', lat: 6.5095, lng: 3.3711, area: 'Yaba' },
  { id: 'stop-maryland', name: 'Maryland Bus Terminal', mode: 'road', lat: 6.5711, lng: 3.3644, area: 'Maryland' },
  { id: 'stop-ojota', name: 'Ojota', mode: 'road', lat: 6.5786, lng: 3.3778, area: 'Ojota' },
  { id: 'stop-ikeja', name: 'Ikeja Along', mode: 'road', lat: 6.6018, lng: 3.3515, area: 'Ikeja' },
  { id: 'stop-oshodi', name: 'Oshodi Interchange', mode: 'road', lat: 6.5558, lng: 3.3468, area: 'Oshodi' },
  { id: 'stop-mile2', name: 'Mile 2 Bus Terminal', mode: 'road', lat: 6.4593, lng: 3.2955, area: 'Mile 2' },
  { id: 'stop-surulere', name: 'Surulere (Bode Thomas)', mode: 'road', lat: 6.4923, lng: 3.3546, area: 'Surulere' },
  { id: 'stop-ikorodu-garage', name: 'Ikorodu Garage', mode: 'road', lat: 6.6018, lng: 3.5106, area: 'Ikorodu' },

  // Ferry / jetty stops
  { id: 'stop-marina-ferry', name: 'Marina Ferry Terminal', mode: 'ferry', lat: 6.4515, lng: 3.3985, area: 'Lagos Island' },
  { id: 'stop-falomo-jetty', name: 'Falomo Jetty', mode: 'ferry', lat: 6.4497, lng: 3.4278, area: 'Ikoyi' },
  { id: 'stop-ikorodu-ferry', name: 'Ikorodu Ferry Terminal', mode: 'ferry', lat: 6.6069, lng: 3.5065, area: 'Ikorodu' },
  { id: 'stop-apapa-ferry', name: 'Apapa Ferry Terminal', mode: 'ferry', lat: 6.4432, lng: 3.3592, area: 'Apapa' },
  { id: 'stop-tarkwa-bay', name: 'Tarkwa Bay Jetty', mode: 'ferry', lat: 6.4004, lng: 3.3808, area: 'Tarkwa Bay' },
];
