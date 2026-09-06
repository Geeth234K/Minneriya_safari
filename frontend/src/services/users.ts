import { apiFetch } from "./api";
import type { User, RegisterPayload } from "@/types";

export async function registerUser(data: RegisterPayload): Promise<User> {
  return apiFetch<User>("/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<User> {
  return apiFetch<User>("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
