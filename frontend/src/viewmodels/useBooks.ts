import { useQuery } from '@tanstack/react-query';
import { booksApi } from '../models/booksApi';

export function useBooks() {
  return useQuery({ queryKey: ['books'], queryFn: booksApi.list });
}
