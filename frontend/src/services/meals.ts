import type { Meal } from "@/types";
import { mealsData } from "@/data/meals";

export async function getMeals(): Promise<Meal[]> {
  return mealsData;
}
