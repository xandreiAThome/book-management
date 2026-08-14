import { api } from '../lib/api';
import type { AuthResponse } from './types';

export const authApi = {
  login: (username: string, password: string) => 
    api.post<AuthResponse>('/auth/login', { username, password }).then(r => r.data),
  
  register: (username: string, password: string, role: string) => 
    api.post('/auth/register', { username, password, role }).then(r => r.data)
};
