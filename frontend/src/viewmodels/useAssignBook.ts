import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsApi } from '../models/assignmentsApi';

export function useAssignBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookId, studentIds }: { bookId: string; studentIds: string[] }) =>
      assignmentsApi.assign(bookId, studentIds),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
    onError: (err: any) => {
      throw err;
    },
  });
}
