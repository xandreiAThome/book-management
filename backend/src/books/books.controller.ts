import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import type { ICurrentUser } from '../auth/interfaces/current-user.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(UserRole.TEACHER)
  @Post()
  create(
    @Body() createBookDto: CreateBookDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.booksService.create(createBookDto, user.id);
  }

  @Roles(UserRole.TEACHER)
  @Get()
  findAll(@CurrentUser() user: ICurrentUser) {
    return this.booksService.findAllByTeacher(user.id);
  }

  @Roles(UserRole.TEACHER)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.booksService.findOne(id, user.id);
  }

  @Roles(UserRole.TEACHER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.booksService.update(id, updateBookDto, user.id);
  }

  @Roles(UserRole.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.booksService.remove(id, user.id);
  }
}
