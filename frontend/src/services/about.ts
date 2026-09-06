import { apiFetch } from "./api";
import type { AboutPage } from "@/types";

export async function getAboutData(): Promise<AboutPage> {
  return apiFetch<AboutPage>("/about");
}
