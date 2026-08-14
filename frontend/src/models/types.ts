export type UserRole = 'TEACHER' | 'STUDENT';

export interface User { 
  id: string; 
  username: string; 
  role: UserRole;
}

export interface AuthResponse { 
  accessToken: string; 
  user: User;
}

export interface Book {
  id: string; 
  teacherId: string; 
  title: string;
  description?: string; 
  coverImg?: string; 
  createdAt: string;
  assignments?: { student: { username: string } }[];
}

export interface BookAssignment {
  id: string; 
  bookId: string; 
  studentId: string; 
  teacherId: string;
  assignedAt: string; 
  book: Book;
}
