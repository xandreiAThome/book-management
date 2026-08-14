import { api } from '../lib/api';
import type { User } from './types';

export const usersApi = {
  listStudents: () => 
    api.get<User[]>('/users?role=STUDENT').then(r => r.data)
};
