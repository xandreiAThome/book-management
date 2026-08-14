import { useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '../models/booksApi';

export function useUpdateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      booksApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
}
