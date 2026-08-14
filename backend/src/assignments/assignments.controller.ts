import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignBookDto } from './dto/assign-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import type { ICurrentUser } from '../auth/interfaces/current-user.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Roles(UserRole.TEACHER)
  @Post('books/:bookId/assign')
  assignBook(
    @Param('bookId') bookId: string,
    @Body() assignBookDto: AssignBookDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.assignmentsService.assignBook(bookId, assignBookDto, user.id);
  }

  @Roles(UserRole.STUDENT)
  @Get('my-books')
  getMyBooks(@CurrentUser() user: ICurrentUser) {
    return this.assignmentsService.getMyBooks(user.id);
  }
}
