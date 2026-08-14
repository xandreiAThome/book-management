import { useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '../models/booksApi';

export function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => booksApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
