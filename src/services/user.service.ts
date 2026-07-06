import { getCurrentUser } from "../api/users";

export async function fetchCurrentUser() {
  return await getCurrentUser();
}