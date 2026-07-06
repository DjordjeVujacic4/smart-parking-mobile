import { User } from "../types/user";
import { api } from "./client";

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}