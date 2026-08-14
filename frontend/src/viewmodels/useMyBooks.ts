import { useQuery } from '@tanstack/react-query';
import { assignmentsApi } from '../models/assignmentsApi';

export function useMyBooks() {
  return useQuery({ queryKey: ['my-books'], queryFn: assignmentsApi.getMyBooks });
}
