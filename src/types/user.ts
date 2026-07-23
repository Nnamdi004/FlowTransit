export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: string;
}

export type PublicUser = Omit<User, 'passwordHash'>;
