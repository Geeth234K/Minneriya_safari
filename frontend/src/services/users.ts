import type { User, RegisterPayload } from "@/types";

export async function registerUser(data: RegisterPayload): Promise<User> {
  return {
    _id: `usr-${Date.now()}`,
    id: `usr-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: "user",
  };
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<User> {
  return {
    _id: "usr-guest",
    id: "usr-guest",
    name: "Guest Traveler",
    email: data.email,
    role: "user",
  };
}
