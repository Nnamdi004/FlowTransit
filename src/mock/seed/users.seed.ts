import type { User } from '@/types';
import { mockHash } from '@/utils/mockHash';

/** Demo credentials (shown on the login screen): password123 for every seeded account. */
export const usersSeed: User[] = [
  {
    id: 'user-admin-1',
    name: 'Amaka Chukwu',
    email: 'admin@flowtransit.ng',
    passwordHash: mockHash('password123'),
    role: 'admin',
    avatarUrl: undefined,
    phone: '+234 802 123 4567',
    createdAt: '2025-11-02T09:00:00.000Z',
    isActive: true,
  },
  {
    id: 'user-demo-1',
    name: 'Tunde Bakare',
    email: 'user@flowtransit.ng',
    passwordHash: mockHash('password123'),
    role: 'user',
    avatarUrl: undefined,
    phone: '+234 803 987 6543',
    createdAt: '2025-12-14T09:00:00.000Z',
    isActive: true,
  },
  {
    id: 'user-demo-2',
    name: 'Ifeoma Eze',
    email: 'ifeoma.eze@example.com',
    passwordHash: mockHash('password123'),
    role: 'user',
    avatarUrl: undefined,
    phone: '+234 805 222 1198',
    createdAt: '2026-01-20T09:00:00.000Z',
    isActive: true,
  },
  {
    id: 'user-demo-3',
    name: 'Chinedu Obi',
    email: 'chinedu.obi@example.com',
    passwordHash: mockHash('password123'),
    role: 'user',
    avatarUrl: undefined,
    phone: '+234 701 445 9021',
    createdAt: '2026-02-11T09:00:00.000Z',
    isActive: false,
  },
];
