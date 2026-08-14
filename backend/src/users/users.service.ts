import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByRole(role: UserRole = UserRole.STUDENT) {
    return this.prisma.user.findMany({
      where: { role },
      select: { id: true, username: true, role: true },
      orderBy: { username: 'asc' },
    });
  }
}
