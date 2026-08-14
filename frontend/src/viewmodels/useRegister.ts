import { useMutation } from '@tanstack/react-query';
import { authApi } from '../models/authApi';
import { useAuth } from '../lib/auth-context';

export function useRegister() {
  const { setSession } = useAuth();
  return useMutation({
    mutationFn: ({ username, password, role }: { username: string; password: string; role: string }) =>
      authApi.register(username, password, role),
    // After register, you might auto-login or just return. Based on prompt, if success we navigate, but auth API returns accessToken?
    // Let's assume authApi.register returns { accessToken, user } just like login based on common patterns, or maybe not. 
    // The prompt says POST /auth/register -> { username, password, role } (no explicit response in prompt), we will just let the view handle navigation.
  });
}
