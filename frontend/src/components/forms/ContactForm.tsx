"use client";

import { useState, FormEvent } from "react";
import { registerUser } from "@/services/users";
import { createBooking } from "@/services/bookings";

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  message: string;
  interests: string[];
}

interface FormErrors {
  [key: string]: string;
}

const interestOptions = ["Jeep Safari", "Village Tours", "Local Food", "Accommodation"];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    message: "",
    interests: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Phone / WhatsApp is required";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const guestPassword = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const uniqueEmail = `${formData.email.split("@")[0]}+${Date.now()}@${formData.email.split("@")[1]}`;

      let userId: string;
      try {
        const user = await registerUser({
          name: formData.fullName,
          email: formData.email,
          password: guestPassword,
        });
        userId = user._id || user.id || "";
      } catch {
        const user = await registerUser({
          name: formData.fullName,
          email: uniqueEmail,
          password: guestPassword,
        });
        userId = user._id || user.id || "";
      }

      await createBooking({
        userId,
        bookingType: "itinerary",
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date().toISOString(),
        guests: 1,
        interests: formData.interests,
        requests: formData.message,
      });

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send inquiry. Please try again."
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

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
          Inquiry Sent!
        </h3>
        <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6 leading-relaxed">
          Thank you for your interest! We&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({ fullName: "", email: "", whatsapp: "", message: "", interests: [] });
          }}
          className="btn btn-outline !text-[var(--color-primary)] !border-[var(--color-primary)]"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-fullName" className="form-label">Full Name *</label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className={`form-input ${errors.fullName ? "!border-[var(--color-error)]" : ""}`}
            placeholder="Your name"
          />
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="form-label">Email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "!border-[var(--color-error)]" : ""}`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-whatsapp" className="form-label">Phone / WhatsApp *</label>
        <input
          id="contact-whatsapp"
          name="whatsapp"
          type="tel"
          value={formData.whatsapp}
          onChange={handleChange}
          className={`form-input ${errors.whatsapp ? "!border-[var(--color-error)]" : ""}`}
          placeholder="+94 77 123 4567"
        />
        {errors.whatsapp && <p className="form-error">{errors.whatsapp}</p>}
      </div>

      {/* Interests */}
      <div>
        <span className="form-label">I&apos;m interested in</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                formData.interests.includes(interest)
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-primary)]"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="form-label">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`form-input resize-none ${errors.message ? "!border-[var(--color-error)]" : ""}`}
          placeholder="Tell us about your travel plans..."
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      {status === "error" && errorMessage && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-[var(--color-error)] text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary btn-lg w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          "Send Inquiry"
        )}
      </button>
    </form>
  );
}
