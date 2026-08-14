import { useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '../models/booksApi';
import type { Book } from '../models/types';

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Book>) => booksApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
