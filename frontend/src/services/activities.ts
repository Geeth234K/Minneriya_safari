import type { Activity } from "@/types";
import { activitiesData } from "@/data/activities";

export async function getActivities(): Promise<Activity[]> {
  return activitiesData;
}

export async function getActivityById(id: string): Promise<Activity | null> {
  const activity = activitiesData.find((a) => a._id === id);
  return activity || null;
}
