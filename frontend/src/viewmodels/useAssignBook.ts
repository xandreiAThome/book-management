import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsApi } from '../models/assignmentsApi';

export function useAssignBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookId, studentId }: { bookId: string; studentId: string }) =>
      assignmentsApi.assign(bookId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
    onError: (err: any) => {
      if (err.response?.status === 409) {
        throw new Error('This book is already assigned to this student.');
      }
      throw err;
    },
  });
}
