import { cookies } from "next/headers";
import { validToken } from "../jwt";
import { UserSession } from "@/types/user";

export const getUserSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return null;

  const payload = await validToken();

  if (!payload) return null;

  const userSession = {
    userId: payload.userId,
    username: payload.username,
    name: payload.name,
    lastname: payload.lastname,
    email: payload.email,
    role: payload.role,
    restaurantId: payload.restaurantId,
    isActive: payload.isActive,
    lastLogin: payload.lastLogin,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
  };

  return userSession as UserSession;
}