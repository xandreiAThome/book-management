import { UserRole } from '@prisma/client';

export interface ICurrentUser {
  id: string;
  username: string;
  role: UserRole;
}
