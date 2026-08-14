import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../models/usersApi';

export function useStudents() {
  return useQuery({ queryKey: ['students'], queryFn: usersApi.listStudents });
}
