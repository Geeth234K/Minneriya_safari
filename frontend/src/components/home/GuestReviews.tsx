"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ReviewForm from "@/components/forms/ReviewForm";
import { testimonials, type Testimonial } from "@/data/testimonials";

const COUNTRY_FLAGS: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  Australia: "🇦🇺",
  Japan: "🇯🇵",
  Spain: "🇪🇸",
  Netherlands: "🇳🇱",
  France: "🇫🇷",
  "United States": "🇺🇸",
  Canada: "🇨🇦",
  Italy: "🇮🇹",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const flag = COUNTRY_FLAGS[testimonial.country] || "🌍";
  return (
    <div className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <StarRating rating={testimonial.rating} />
        <p className="text-sm text-[var(--color-text)] leading-relaxed mt-3 font-light">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>
      <div className="mt-5 pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg leading-none" aria-hidden="true">{flag}</span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--color-text)] truncate">
              {testimonial.name}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] truncate">
              {testimonial.country}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] shrink-0 border border-[var(--color-border)]">
          {testimonial.trip}
        </span>
      </div>
    </div>
  );
}

export default function GuestReviews() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="section-padding bg-[var(--color-bg-alt)]">
      <div className="section-container">
        <SectionTitle
          eyebrow="Guest Reviews"
          title="What Our Visitors Say"
          description="Real experiences from travelers around the world who explored Minneriya with us."
        />

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 max-w-5xl mx-auto">
          {visible.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* Show more toggle */}
        {testimonials.length > 3 && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors cursor-pointer"
            >
              {showAll ? "Show Less" : `Show All ${testimonials.length} Reviews`}
            </button>
          </div>
        )}

        {/* ── Write a Review Form ── */}
        <div className="mt-14 max-w-xl mx-auto">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm p-6 sm:p-8">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 mb-3">
                Share Your Experience
              </span>
              <h3
                className="text-xl sm:text-2xl font-bold text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Write a Review
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1.5">
                Your feedback helps other travelers plan their Minneriya adventure.
              </p>
            </div>
            <ReviewForm />
          </div>
        </div>
      </div>
    </section>
  );
}

