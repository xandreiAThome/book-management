import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import type { ICurrentUser } from '../auth/interfaces/current-user.interface';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(UserRole.TEACHER)
  @Post()
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  create(
    @Body() createBookDto: CreateBookDto,
    @CurrentUser() user: ICurrentUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createBookDto.coverImg = `/uploads/${file.filename}`;
    }
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
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @CurrentUser() user: ICurrentUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateBookDto.coverImg = `/uploads/${file.filename}`;
    }
    return this.booksService.update(id, updateBookDto, user.id);
  }

  @Roles(UserRole.TEACHER)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.booksService.remove(id, user.id);
  }
}
