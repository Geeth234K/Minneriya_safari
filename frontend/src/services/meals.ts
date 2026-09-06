import { apiFetch } from "./api";
import type { Meal } from "@/types";

export async function getMeals(): Promise<Meal[]> {
  return apiFetch<Meal[]>("/meals");
}
