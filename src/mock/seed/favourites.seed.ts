import type { FavouriteLocation } from '@/types';

export const favouritesSeed: FavouriteLocation[] = [
  {
    id: 'fav-1',
    userId: 'user-demo-1',
    label: 'Home — Lekki Phase 1',
    lat: 6.4422,
    lng: 3.4732,
    area: 'Lekki',
    icon: 'home',
  },
  {
    id: 'fav-2',
    userId: 'user-demo-1',
    label: 'Work — Yaba Tech Hub',
    lat: 6.5095,
    lng: 3.3711,
    area: 'Yaba',
    icon: 'briefcase',
  },
  {
    id: 'fav-3',
    userId: 'user-demo-1',
    label: 'Gym — Victoria Island',
    lat: 6.4281,
    lng: 3.4219,
    area: 'Victoria Island',
    icon: 'dumbbell',
  },
  {
    id: 'fav-4',
    userId: 'user-demo-2',
    label: 'Home — Ikorodu',
    lat: 6.6018,
    lng: 3.5106,
    area: 'Ikorodu',
    icon: 'home',
  },
  {
    id: 'fav-5',
    userId: 'user-demo-2',
    label: 'Campus — UNILAG',
    lat: 6.5158,
    lng: 3.3966,
    area: 'Yaba',
    icon: 'graduation-cap',
  },
];
