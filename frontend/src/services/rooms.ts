import { apiFetch } from "./api";
import type { Room } from "@/types";

export async function getRooms(): Promise<Room[]> {
  return apiFetch<Room[]>("/rooms");
}

export async function getRoomById(id: string): Promise<Room> {
  return apiFetch<Room>(`/rooms/${id}`);
}
