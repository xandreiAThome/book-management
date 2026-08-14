import { api } from '../lib/api';
import type { Book } from './types';

export const booksApi = {
  list: () => api.get<Book[]>('/books').then((r) => r.data),
  create: (data: FormData) => api.post<Book>('/books', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  update: (id: string, data: FormData) => api.patch<Book>(`/books/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  remove: (id: string) => api.delete(`/books/${id}`),
};
