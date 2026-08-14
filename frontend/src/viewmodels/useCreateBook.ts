import { useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '../models/booksApi';

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => booksApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
