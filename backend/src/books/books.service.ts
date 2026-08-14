import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto, teacherId: string) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        teacherId,
      },
    });
  }

  async findAllByTeacher(teacherId: string) {
    return this.prisma.book.findMany({
      where: { teacherId },
    });
  }

  async findOne(id: string, teacherId: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.teacherId !== teacherId) {
      throw new ForbiddenException(
        'You do not have permission to access this book',
      );
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto, teacherId: string) {
    await this.findOne(id, teacherId); // ensures book exists and belongs to teacher

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: string, teacherId: string) {
    await this.findOne(id, teacherId); // ensures book exists and belongs to teacher

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
