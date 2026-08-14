import { api } from '../lib/api';
import type { BookAssignment } from './types';

export const assignmentsApi = {
  assign: (bookId: string, studentIds: string[]) => 
    api.post(`/books/${bookId}/assign`, { studentIds }).then(r => r.data),
  
  getMyBooks: () => 
    api.get<BookAssignment[]>('/my-books').then(r => r.data)
};
