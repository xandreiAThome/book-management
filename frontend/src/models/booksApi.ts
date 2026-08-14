import { api } from '../lib/api';
import type { Book } from './types';

export const booksApi = {
  list: () => api.get<Book[]>('/books').then((r) => r.data),
  create: (data: Partial<Book>) => api.post<Book>('/books', data).then((r) => r.data),
  update: (id: string, data: Partial<Book>) => api.patch<Book>(`/books/${id}`, data).then((r) => r.data),
  remove: (id: string) => api.delete(`/books/${id}`),
};
