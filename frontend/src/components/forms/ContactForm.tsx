"use client";

import { useState, FormEvent } from "react";
import { registerUser } from "@/services/users";
import { createBooking } from "@/services/bookings";

interface ExperienceOption {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: string;
}

const experiences: ExperienceOption[] = [
  {
    id: "Jeep Safari",
    title: "Jeep Safari Experience",
    subtitle: "Minneriya / Kaudulla elephant gathering in customized 4x4",
    badge: "Most Popular",
    icon: "jeep",
  },
  {
    id: "Village Tours",
    title: "Village & Culture Tour",
    subtitle: "Catamaran boat ride, bullock cart & authentic rural life",
    badge: "Top Rated",
    icon: "boat",
  },
  {
    id: "Local Food",
    title: "Traditional Local Feast",
    subtitle: "Farm-fresh organic Sri Lankan lunch served in clay pots",
    badge: "Taste of Lanka",
    icon: "food",
  },
  {
    id: "Accommodation",
    title: "Eco Stay / Rooms",
    subtitle: "Relaxing nature stay with AC rooms close to the park",
    badge: "Comfort Stay",
    icon: "home",
  },
];

const timeSlots = [
  { id: "afternoon", label: "Afternoon Safari (2:30 PM)", hint: "Best for elephants" },
  { id: "morning", label: "Morning Safari (6:00 AM)", hint: "Birds & sunrise" },
  { id: "flexible", label: "Flexible / Full Day", hint: "Custom timing" },
];

const WHATSAPP_NUMBER = "94704881033";

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  date: string;
  timeSlot: string;
  guests: number;
  message: string;
  interests: string[];
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    date: "",
    timeSlot: "afternoon",
    guests: 2,
    message: "",
    interests: ["Jeep Safari"],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState("");

  const toggleInterest = (id: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(id);
      const next = exists
        ? prev.interests.filter((item) => item !== id)
        : [...prev.interests, id];
      return { ...prev, interests: next.length > 0 ? next : [id] };
    });
  };

  const updateGuests = (delta: number) => {
    setFormData((prev) => {
      const next = Math.max(1, Math.min(25, prev.guests + delta));
      return { ...prev, guests: next };
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Please enter your name";
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPreferredDate = (dateStr: string): string => {
    if (!dateStr) return "Flexible / To be decided";
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

  const experienceTitleMap: Record<string, string> = {
    "Jeep Safari": "Jeep Safari Experience",
    "Village Tours": "Village & Culture Tour",
    "Local Food": "Traditional Local Feast",
    "Accommodation": "Eco Stay / Accommodation",
  };

  const buildWhatsAppMessage = (): string => {
    const selectedSlot =
      timeSlots.find((t) => t.id === formData.timeSlot)?.label || formData.timeSlot;

    const experiencesList = formData.interests
      .map((id) => `  ✓ ${experienceTitleMap[id] || id}`)
      .join("\n");

    const emailLine = formData.email.trim()
      ? `• Email: ${formData.email.trim()}\n`
      : "";

    const notesSection = formData.message.trim()
      ? `📍 *Notes / Hotel Pickup:*\n"${formData.message.trim()}"\n\n`
      : "";

    return (
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🐘 *MINNERIYA SAFARI & TOURS*\n` +
      `     *New Booking Inquiry*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Guest Details:*\n` +
      `• Name: ${formData.fullName.trim()}\n` +
      `• WhatsApp: ${formData.whatsapp.trim()}\n` +
      emailLine +
      `\n` +
      `📅 *Safari Schedule:*\n` +
      `• Preferred Date: ${formatPreferredDate(formData.date)}\n` +
      `• Shift: ${selectedSlot}\n` +
      `• Travelers: ${formData.guests} Guests\n\n` +
      `🎯 *Experiences Selected:*\n` +
      `${experiencesList}\n\n` +
      notesSection +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Minneriya Safari & Tours • Sigiriya, Sri Lanka_`
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || status === "loading") return;

    setStatus("loading");

    const messageText = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    setSubmittedWhatsAppUrl(whatsappUrl);

    // Attempt direct window open for instantaneous response
    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Handled via the prominent WhatsApp button on the success view
    }

    // Backup to backend MongoDB in background
    try {
      const guestPassword = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const safeEmail =
        formData.email.trim() ||
        `guest_${formData.whatsapp.replace(/\D/g, "") || Date.now()}@minneriyasafari.local`;
      const uniqueEmail = `${safeEmail.split("@")[0]}+${Date.now()}@${safeEmail.split("@")[1] || "minneriyasafari.local"}`;

      let userId: string = "";
      try {
        const user = await registerUser({
          name: formData.fullName,
          email: safeEmail,
          password: guestPassword,
        });
        userId = user._id || user.id || "";
      } catch {
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
          bookingType: "itinerary",
          fullName: formData.fullName,
          email: safeEmail,
          whatsapp: formData.whatsapp,
          checkInDate: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
          checkOutDate: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
          guests: formData.guests,
          interests: formData.interests,
          requests: `[Slot: ${formData.timeSlot}] ${formData.message}`.trim(),
        });
      }
    } catch (err) {
      console.warn("Backend booking sync:", err);
    } finally {
      setStatus("success");
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "jeep":
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a2 2 0 114 0m-4 0h3m-7-9h4m2 0h2a1 1 0 011 1v5m-1 3a2 2 0 11-4 0m4 0h1a1 1 0 001-1v-2a1 1 0 00-1-1h-2" />
          </svg>
        );
      case "boat":
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "food":
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10 px-4 animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200 mb-3 uppercase tracking-wider">
          Inquiry Ready
        </span>

        <h3
          className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          WhatsApp Chat Opened!
        </h3>

        <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          Your safari itinerary is organized. If WhatsApp didn&apos;t automatically launch on your screen, click below to send your itinerary directly to our safari team:
        </p>

        {submittedWhatsAppUrl && (
          <a
            href={submittedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-md mx-auto mb-5 !bg-[#25D366] hover:!bg-[#20ba59] !text-white flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 font-semibold text-sm sm:text-base transition-transform hover:-translate-y-0.5 text-center"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Open WhatsApp Chat
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
                date: "",
                timeSlot: "afternoon",
                guests: 2,
                message: "",
                interests: ["Jeep Safari"],
              });
              setSubmittedWhatsAppUrl("");
            }}
            className="text-sm text-[var(--color-primary)] font-medium hover:underline inline-flex items-center gap-1.5"
          >
            ← Configure Another Safari Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* ── STEP 1: EXPERIENCE SELECTOR ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary)] tracking-widest uppercase">
              Step 1
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Select Your Safari Experiences
            </h3>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] bg-slate-100 px-2.5 py-1 rounded-full">
            {formData.interests.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {experiences.map((exp) => {
            const isSelected = formData.interests.includes(exp.id);
            return (
              <div
                key={exp.id}
                onClick={() => toggleInterest(exp.id)}
                className={`relative cursor-pointer rounded-xl p-3 sm:p-4 border-2 transition-all select-none ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm"
                    : "border-[var(--color-border)] hover:border-slate-300 bg-[var(--color-surface)]"
                }`}
              >
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[var(--color-primary)] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {renderIcon(exp.icon)}
                  </div>

                  <div className="flex-1 pr-5 sm:pr-6 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug">
                        {exp.title}
                      </h4>
                      {exp.badge && (
                        <span
                          className={`text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-[var(--color-primary)] text-white"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {exp.subtitle}
                    </p>
                  </div>
                </div>

                {/* Checkbox badge */}
                <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white scale-105"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── STEP 2: TIMING & TRAVELERS ── */}
      <div className="pt-2 border-t border-slate-100">
        <span className="text-xs font-bold text-[var(--color-primary)] tracking-widest uppercase block mb-1">
          Step 2
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3">
          Date & Travelers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Preferred Date */}
          <div>
            <label htmlFor="exp-date" className="block text-xs font-medium text-slate-700 mb-1.5">
              Preferred Safari Date
            </label>
            <input
              id="exp-date"
              type="date"
              min={today}
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              className="form-input text-sm !py-2.5"
            />
          </div>

          {/* Number of Travelers Counter */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Number of Travelers
            </label>
            <div className="flex items-center justify-between border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] px-2.5 sm:px-3 py-1.5">
              <span className="text-xs text-[var(--color-text-muted)] font-medium">
                Travelers:
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => updateGuests(-1)}
                  disabled={formData.guests <= 1}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-bold flex items-center justify-center text-slate-700 transition-colors"
                >
                  −
                </button>
                <span className="text-sm sm:text-base font-bold text-slate-900 w-5 sm:w-6 text-center">
                  {formData.guests}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuests(1)}
                  disabled={formData.guests >= 25}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-bold flex items-center justify-center text-slate-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Time slot chips */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Preferred Safari Shift
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const active = formData.timeSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot.id }))}
                  className={`p-2.5 rounded-lg border text-left transition-all ${active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold shadow-xs"
                      : "border-[var(--color-border)] hover:border-slate-300 bg-white text-slate-700"
                    }`}
                >
                  <div className="text-xs font-medium">{slot.label}</div>
                  <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                    {slot.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STEP 3: CONTACT INFORMATION ── */}
      <div className="pt-2 border-t border-slate-100">
        <span className="text-xs font-bold text-[var(--color-primary)] tracking-widest uppercase block mb-1">
          Step 3
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3">
          Your Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Full Name */}
          <div>
            <label htmlFor="exp-fullName" className="block text-xs font-medium text-slate-700 mb-1.5">
              Full Name *
            </label>
            <input
              id="exp-fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => {
                setFormData((p) => ({ ...p, fullName: e.target.value }));
                if (errors.fullName) setErrors((p) => ({ ...p, fullName: "" }));
              }}
              className={`form-input text-sm ${errors.fullName ? "!border-[var(--color-error)]" : ""}`}
              placeholder="e.g. David Miller"
            />
            {errors.fullName && <p className="form-error">{errors.fullName}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="exp-whatsapp" className="block text-xs font-medium text-slate-700 mb-1.5">
              WhatsApp / Phone *
            </label>
            <div className="relative">
              <input
                id="exp-whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => {
                  setFormData((p) => ({ ...p, whatsapp: e.target.value }));
                  if (errors.whatsapp) setErrors((p) => ({ ...p, whatsapp: "" }));
                }}
                className={`form-input text-sm ${errors.whatsapp ? "!border-[var(--color-error)]" : ""}`}
                placeholder="+94 70 488 1033 or international"
              />
            </div>
            {errors.whatsapp && <p className="form-error">{errors.whatsapp}</p>}
          </div>
        </div>

        {/* Email & Notes */}
        <div className="space-y-4">
          <div>
            <label htmlFor="exp-email" className="block text-xs font-medium text-slate-700 mb-1.5">
              Email Address <span className="text-slate-400 font-normal">(Optional for confirmation)</span>
            </label>
            <input
              id="exp-email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData((p) => ({ ...p, email: e.target.value }));
                if (errors.email) setErrors((p) => ({ ...p, email: "" }));
              }}
              className={`form-input text-sm ${errors.email ? "!border-[var(--color-error)]" : ""}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="exp-message" className="block text-xs font-medium text-slate-700 mb-1.5">
              Special Requests / Hotel Pickup Location
            </label>
            <textarea
              id="exp-message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              className="form-input text-sm resize-none"
              placeholder="e.g. Need hotel pickup in Sigiriya/Habarana, private jeep, binoculars, etc."
            />
          </div>
        </div>
      </div>

      {/* ── LIVE SUMMARY BAR ── */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-600 leading-relaxed">
          <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Selected Safari Itinerary:
          </div>
          <div>
            {formData.interests.length} Experiences • {formData.guests} Traveler(s)
            {formData.date ? ` • ${formData.date}` : ""}
          </div>
        </div>

        <div className="text-xs text-emerald-700 font-medium flex items-center gap-1 shrink-0 bg-emerald-100/60 px-2.5 py-1 rounded-md">
          <span>⚡ Instant WhatsApp Connection</span>
        </div>
      </div>

      {/* ── SUBMIT BUTTON ── */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full !bg-[#1E7145] hover:!bg-[#175836] !text-white flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-sm sm:text-base font-semibold shadow-lg shadow-emerald-900/10 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed text-center"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Opening WhatsApp...
          </span>
        ) : (
          <>
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Send Inquiry via WhatsApp</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-[var(--color-text-muted)] -mt-4">
        Direct chat with our safari guide on WhatsApp • No payment needed to inquire
      </p>
    </form>
  );
}
