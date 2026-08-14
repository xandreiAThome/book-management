import { useMutation } from '@tanstack/react-query';
import { authApi } from '../models/authApi';
import { useAuth } from '../lib/auth-context';

export function useLogin() {
  const { setSession } = useAuth();
  return useMutation({
    mutationFn: ({ username, password }: Parameters<typeof authApi.login>[0] extends never ? any : { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: ({ accessToken, user }) => setSession(accessToken, user),
  });
}
