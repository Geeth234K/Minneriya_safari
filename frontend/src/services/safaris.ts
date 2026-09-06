import { apiFetch } from "./api";
import type { Safari } from "@/types";

export async function getSafaris(): Promise<Safari[]> {
  return apiFetch<Safari[]>("/safaris");
}

export async function getSafariById(id: string): Promise<Safari> {
  return apiFetch<Safari>(`/safaris/${id}`);
}
