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
    const { studentIds } = assignBookDto;

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

    // Begin transaction to sync students
    return this.prisma.$transaction(async (tx) => {
      // Remove all existing assignments
      await tx.bookAssignment.deleteMany({
        where: { bookId, teacherId }
      });

      // Insert new ones
      if (studentIds.length > 0) {
        await tx.bookAssignment.createMany({
          data: studentIds.map(studentId => ({
            bookId,
            studentId,
            teacherId
          }))
        });
      }
      return { success: true };
    });
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
