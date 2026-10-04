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

const WHATSAPP_NUMBER = "94762838796";

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
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState("");

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

    const selectedRoom = rooms.find((r) => r._id === formData.roomId)?.name || "Room";

    const formatStayDate = (dateStr: string): string => {
      if (!dateStr) return "N/A";
      try {
        const d = new Date(dateStr + "T00:00:00");
        return d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } catch {
        return dateStr;
      }
    };

    const specialReq = formData.requests.trim()
      ? `📍 *Special Requests:*\n"${formData.requests.trim()}"\n\n`
      : "";

    const messageText =
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🐘 *MINNERIYA SAFARI & TOURS*\n` +
      `   *Room Reservation Request*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Guest Details:*\n` +
      `• Name: ${formData.fullName.trim()}\n` +
      `• WhatsApp: ${formData.whatsapp.trim()}\n` +
      `• Email: ${formData.email.trim()}\n\n` +
      `🏡 *Stay Schedule:*\n` +
      `• Room: ${selectedRoom}\n` +
      `• Check-in: ${formatStayDate(formData.checkInDate)}\n` +
      `• Check-out: ${formatStayDate(formData.checkOutDate)}\n` +
      `• Travelers: ${formData.guests} Guests\n\n` +
      specialReq +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Minneriya Safari & Tours • Sigiriya, Sri Lanka_`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    setSubmittedWhatsAppUrl(whatsappUrl);

    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      // ignore popup blocker
    }

    try {
      // Step 1: Register guest user
      const guestPassword = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      let userId: string = "";

      try {
        const user = await registerUser({
          name: formData.fullName,
          email: formData.email,
          password: guestPassword,
        });
        userId = user._id || user.id || "";
      } catch {
        const uniqueEmail = `${formData.email.split("@")[0]}+${Date.now()}@${formData.email.split("@")[1]}`;
        try {
          const user = await registerUser({
            name: formData.fullName,
            email: uniqueEmail,
            password: guestPassword,
          });
          userId = user._id || user.id || "";
        } catch {
          // ignore
        }
      }

      if (userId) {
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
      }
    } catch (err) {
      console.warn("Backend reservation log:", err);
    } finally {
      setStatus("success");
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
      <div className="text-center py-8 px-4 animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold mb-2 text-slate-800"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Reservation Ready & WhatsApp Opened!
        </h3>
        <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6 text-sm leading-relaxed">
          Your room reservation request has been created. If WhatsApp didn&apos;t open automatically, click the button below to send your reservation directly:
        </p>

        {submittedWhatsAppUrl && (
          <a
            href={submittedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg w-full max-w-md mx-auto mb-6 !bg-[#25D366] hover:!bg-[#20ba59] !text-white flex items-center justify-center gap-3 shadow-md font-semibold transition-colors"
          >
            <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Send via WhatsApp Chat
          </a>
        )}

        <div>
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
              setSubmittedWhatsAppUrl("");
            }}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] underline transition-colors"
          >
            Submit Another Request
          </button>
        </div>
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
            placeholder="+94 76 283 8796"
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
        className="btn btn-primary btn-lg w-full disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 !bg-[#1E7145] hover:!bg-[#175836] !text-white font-medium shadow-md transition-all"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Opening WhatsApp...
          </span>
        ) : (
          <>
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Send Reservation Request via WhatsApp
          </>
        )}
      </button>
    </form>
  );
}
