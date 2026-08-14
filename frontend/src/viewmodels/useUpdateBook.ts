import { useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '../models/booksApi';
import type { Book } from '../models/types';

export function useUpdateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Book> }) => booksApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
