// types.ts
export type Role = 'ADMIN' | 'GESTOR' | 'STAFF';

export interface UserSession {
  userId: number | string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  role: Role;
  restaurantId: number;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}