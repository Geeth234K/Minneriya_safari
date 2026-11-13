"use client";

import { useState, FormEvent } from "react";

const TRIP_OPTIONS = [
  "Morning Safari",
  "Afternoon Safari",
  "Full Day Safari",
  "Safari + Village Tour",
  "Safari + Lunch",
  "Overnight Stay + Safari",
  "Other",
];

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [trip, setTrip] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setErrorMsg("Please enter your name and review.");
      return;
    }
    if (text.trim().length < 10) {
      setErrorMsg("Please write at least a short sentence about your experience.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          country: country.trim(),
          rating,
          text: text.trim(),
          trip,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Something went wrong" }));
        throw new Error(data.error || "Failed to submit review");
      }

      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          className="text-xl font-bold text-[var(--color-text)] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thank You for Your Review!
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
          Your feedback means the world to us. We&apos;ll review your submission
          and it may be featured on our website.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setCountry("");
            setRating(5);
            setText("");
            setTrip("");
          }}
          className="mt-4 text-sm text-[var(--color-primary)] font-medium hover:underline"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Star Rating */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
          Your Rating
        </label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="cursor-pointer transition-transform hover:scale-110"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "text-amber-400"
                    : "text-slate-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Name & Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="review-name" className="block text-xs font-medium text-slate-700 mb-1.5">
            Your Name *
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input text-sm"
            placeholder="e.g. Emma & James"
          />
        </div>
        <div>
          <label htmlFor="review-country" className="block text-xs font-medium text-slate-700 mb-1.5">
            Country
          </label>
          <input
            id="review-country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="form-input text-sm"
            placeholder="e.g. United Kingdom"
          />
        </div>
      </div>

      {/* Trip Type */}
      <div>
        <label htmlFor="review-trip" className="block text-xs font-medium text-slate-700 mb-1.5">
          Which experience did you enjoy?
        </label>
        <select
          id="review-trip"
          value={trip}
          onChange={(e) => setTrip(e.target.value)}
          className="form-input text-sm"
        >
          <option value="">Select experience (optional)</option>
          {TRIP_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Review Text */}
      <div>
        <label htmlFor="review-text" className="block text-xs font-medium text-slate-700 mb-1.5">
          Your Review *
        </label>
        <textarea
          id="review-text"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-input text-sm resize-none"
          placeholder="Tell us about your experience... What did you enjoy most?"
        />
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}

