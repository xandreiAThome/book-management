import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssignBookDto } from './dto/assign-book.dto';
import { Prisma, UserRole } from '@prisma/client';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async assignBook(
    bookId: string,
    assignBookDto: AssignBookDto,
    teacherId: string,
  ) {
    const { studentId } = assignBookDto;

    // Validate book belongs to requesting teacher
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    if (book.teacherId !== teacherId) {
      throw new ForbiddenException(
        'You do not have permission to assign this book',
      );
    }

    // Validate studentId refers to a user with role STUDENT
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
    });
    if (!student || student.role !== UserRole.STUDENT) {
      throw new NotFoundException('Student not found or invalid role');
    }

    try {
      return await this.prisma.bookAssignment.create({
        data: {
          bookId,
          studentId,
          teacherId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'This book is already assigned to the given student',
          );
        }
      }
      throw error;
    }
  }

  async getMyBooks(studentId: string) {
    const assignments = await this.prisma.bookAssignment.findMany({
      where: { studentId },
      include: {
        book: true,
      },
    });

    // Return the assignments, mapping them to book details easily if needed,
    // or just return the assignments with book populated.
    return assignments.map((assignment) => ({
      assignmentId: assignment.id,
      assignedAt: assignment.assignedAt,
      book: assignment.book,
    }));
  }
}
