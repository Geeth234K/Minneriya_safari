import type { Booking, CreateBookingPayload } from "@/types";

export interface SafariEmailInquiryPayload {
  fullName: string;
  email: string;
  whatsapp?: string;
  date?: string;
  timeSlot?: string;
  guests?: number;
  interests?: string[];
  message?: string;
}

export interface SafariEmailInquiryResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  emailResult?: {
    success: boolean;
    simulated?: boolean;
    message?: string;
  };
}

export async function createBooking(
  data: CreateBookingPayload
): Promise<Booking> {
  const simulatedBooking: Booking = {
    _id: `bk-${Date.now()}`,
    userId: data.userId || "guest",
    bookingType: data.bookingType,
    fullName: data.fullName,
    email: data.email,
    whatsapp: data.whatsapp,
    checkInDate: data.checkInDate,
    checkOutDate: data.checkOutDate,
    guests: data.guests,
    interests: data.interests || [],
    requests: data.requests,
    totalPrice: data.totalPrice || 0,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return simulatedBooking;
}

export async function sendSafariEmailInquiry(
  data: SafariEmailInquiryPayload
): Promise<SafariEmailInquiryResponse> {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to send safari email inquiry");
  }

  return res.json();
}
