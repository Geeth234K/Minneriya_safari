"use client";

import { useState, FormEvent } from "react";
import type { Room } from "@/types";
import { registerUser } from "@/services/users";
import { createBooking } from "@/services/bookings";

interface ReservationFormProps {
  rooms: Room[];
}

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomId: string;
  requests: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ReservationForm({ rooms }: ReservationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    roomId: rooms[0]?._id || "",
    requests: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Phone / WhatsApp is required";
    } else if (!/^[\d\s+()-]{7,20}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Please enter a valid phone number";
    }
    if (!formData.checkInDate) newErrors.checkInDate = "Check-in date is required";
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = "Check-out date is required";
    } else if (formData.checkInDate && formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = "Check-out must be after check-in";
    }
    if (formData.guests < 1 || formData.guests > 20) {
      newErrors.guests = "Guests must be between 1 and 20";
    }
    if (!formData.roomId) newErrors.roomId = "Please select a room";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // Step 1: Register guest user
      const guestPassword = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      let userId: string;

      try {
        const user = await registerUser({
          name: formData.fullName,
          email: formData.email,
          password: guestPassword,
        });
        userId = user._id || user.id || "";
      } catch {
        // If email exists, try login with a simple fallback
        // For guest flow, we create with timestamp-based email
        const uniqueEmail = `${formData.email.split("@")[0]}+${Date.now()}@${formData.email.split("@")[1]}`;
        const user = await registerUser({
          name: formData.fullName,
          email: uniqueEmail,
          password: guestPassword,
        });
        userId = user._id || user.id || "";
      }

      // Step 2: Create booking
      await createBooking({
        userId,
        roomId: formData.roomId,
        bookingType: "booking",
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guests: formData.guests,
        requests: formData.requests,
      });

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to submit reservation. Please try again."
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Today for min date
  const today = new Date().toISOString().split("T")[0];

  if (status === "success") {
    return (
      <div className="text-center py-12 px-4 animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Reservation Request Submitted!
        </h3>
        <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6 leading-relaxed">
          Your reservation request has been submitted successfully. The host
          will contact you to confirm availability.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              fullName: "",
              email: "",
              whatsapp: "",
              checkInDate: "",
              checkOutDate: "",
              guests: 1,
              roomId: rooms[0]?._id || "",
              requests: "",
            });
          }}
          className="btn btn-outline !text-[var(--color-primary)] !border-[var(--color-primary)]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="form-label">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className={`form-input ${errors.fullName ? "!border-[var(--color-error)]" : ""}`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "!border-[var(--color-error)]" : ""}`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
      </div>

      {/* Phone + Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="whatsapp" className="form-label">
            Phone / WhatsApp *
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            value={formData.whatsapp}
            onChange={handleChange}
            className={`form-input ${errors.whatsapp ? "!border-[var(--color-error)]" : ""}`}
            placeholder="+94 77 123 4567"
          />
          {errors.whatsapp && <p className="form-error">{errors.whatsapp}</p>}
        </div>
        <div>
          <label htmlFor="guests" className="form-label">
            Number of Guests *
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="20"
            value={formData.guests}
            onChange={handleChange}
            className={`form-input ${errors.guests ? "!border-[var(--color-error)]" : ""}`}
          />
          {errors.guests && <p className="form-error">{errors.guests}</p>}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="checkInDate" className="form-label">
            Check-in Date *
          </label>
          <input
            id="checkInDate"
            name="checkInDate"
            type="date"
            min={today}
            value={formData.checkInDate}
            onChange={handleChange}
            className={`form-input ${errors.checkInDate ? "!border-[var(--color-error)]" : ""}`}
          />
          {errors.checkInDate && <p className="form-error">{errors.checkInDate}</p>}
        </div>
        <div>
          <label htmlFor="checkOutDate" className="form-label">
            Check-out Date *
          </label>
          <input
            id="checkOutDate"
            name="checkOutDate"
            type="date"
            min={formData.checkInDate || today}
            value={formData.checkOutDate}
            onChange={handleChange}
            className={`form-input ${errors.checkOutDate ? "!border-[var(--color-error)]" : ""}`}
          />
          {errors.checkOutDate && <p className="form-error">{errors.checkOutDate}</p>}
        </div>
      </div>

      {/* Room select */}
      <div>
        <label htmlFor="roomId" className="form-label">
          Room *
        </label>
        <select
          id="roomId"
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          className={`form-input ${errors.roomId ? "!border-[var(--color-error)]" : ""}`}
        >
          {rooms.length === 0 && <option value="">No rooms available</option>}
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name} — ${room.pricePerNight}/night
            </option>
          ))}
        </select>
        {errors.roomId && <p className="form-error">{errors.roomId}</p>}
      </div>

      {/* Special requests */}
      <div>
        <label htmlFor="requests" className="form-label">
          Special Requests
        </label>
        <textarea
          id="requests"
          name="requests"
          rows={4}
          value={formData.requests}
          onChange={handleChange}
          className="form-input resize-none"
          placeholder="Any special requests or notes for your stay..."
        />
      </div>

      {/* Error message */}
      {status === "error" && errorMessage && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-[var(--color-error)] text-sm">
          {errorMessage}
        </div>
      )}

      {/* Info notice */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
        <strong>Please note:</strong> Submitting this form sends a reservation
        request. The host will check availability and contact you to confirm
        your booking.
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary btn-lg w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          "Submit Reservation Request"
        )}
      </button>
    </form>
  );
}
