import type { Safari } from "@/types";
import { safarisData } from "@/data/safaris";

export async function getSafaris(): Promise<Safari[]> {
  return safarisData;
}

export async function getSafariById(id: string): Promise<Safari | null> {
  const safari = safarisData.find((s) => s._id === id);
  return safari || safarisData[0] || null;
}
