import { useMutation } from "@tanstack/react-query";
import { authApi } from "../models/authApi";

export function useRegister() {
  return useMutation({
    mutationFn: ({
      username,
      password,
      role,
    }: {
      username: string;
      password: string;
      role: string;
    }) => authApi.register(username, password, role),
  });
}
