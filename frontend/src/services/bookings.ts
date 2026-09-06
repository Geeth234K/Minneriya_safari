import { apiFetch } from "./api";
import type { Booking, CreateBookingPayload } from "@/types";

export async function createBooking(
  data: CreateBookingPayload
): Promise<Booking> {
  return apiFetch<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getBookings(): Promise<Booking[]> {
  return apiFetch<Booking[]>("/bookings");
}

export async function getBookingById(id: string): Promise<Booking> {
  return apiFetch<Booking>(`/bookings/${id}`);
}

export async function updateBooking(
  id: string,
  data: Partial<Booking>
): Promise<Booking> {
  return apiFetch<Booking>(`/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
