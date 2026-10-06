import type { Room } from "@/types";
import { roomsData } from "@/data/rooms";

export async function getRooms(): Promise<Room[]> {
  return roomsData;
}

export async function getRoomById(id: string): Promise<Room | null> {
  const room = roomsData.find((r) => r._id === id);
  return room || roomsData[0] || null;
}
