import type { AboutPage } from "@/types";
import { aboutData } from "@/data/about";

export async function getAboutData(): Promise<AboutPage> {
  return aboutData;
}
