import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '@prisma/client';

export class ListUsersDto {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
