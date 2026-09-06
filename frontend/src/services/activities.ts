import { apiFetch } from "./api";
import type { Activity } from "@/types";

export async function getActivities(): Promise<Activity[]> {
  return apiFetch<Activity[]>("/activities");
}

export async function getActivityById(id: string): Promise<Activity> {
  return apiFetch<Activity>(`/activities/${id}`);
}
