import { api } from '../lib/api';
import type { BookAssignment } from './types';

export const assignmentsApi = {
  assign: (bookId: string, studentId: string) => 
    api.post(`/books/${bookId}/assign`, { studentId }).then(r => r.data),
  
  getMyBooks: () => 
    api.get<BookAssignment[]>('/my-books').then(r => r.data)
};
