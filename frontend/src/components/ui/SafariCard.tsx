import Link from "next/link";
import type { Safari } from "@/types";

interface SafariCardProps {
  safari: Safari;
  featured?: boolean;
}

export default function SafariCard({ safari, featured = false }: SafariCardProps) {
  return (
    <article
      className={`bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300 ${
        featured ? "lg:flex" : ""
      }`}
    >
      {/* Image placeholder - themed icon area */}
      <div
        className={`relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center ${
          featured ? "lg:w-2/5 h-56 lg:h-auto" : "h-48"
        }`}
      >
        <div className="text-center text-white p-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/15 flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
          <span className="text-sm font-medium text-white/80">{safari.duration}</span>
        </div>

        {/* Discount badge */}
        {safari.discountPercent > 0 && (
          <span className="absolute top-3 right-3 bg-[var(--color-accent)] text-[var(--color-primary-dark)] text-xs font-bold px-2.5 py-1 rounded-full">
            {safari.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className={`p-5 md:p-6 ${featured ? "lg:w-3/5" : ""}`}>
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {safari.title}
        </h3>
        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
          {safari.description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {safari.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {safari.groupSize}
          </span>
        </div>

        {/* Includes */}
        {safari.includes.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-[var(--color-text)] mb-2 uppercase tracking-wider">
              Includes
            </p>
            <ul className="space-y-1">
              {safari.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Wildlife */}
        {safari.wildlife.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-[var(--color-text)] mb-2 uppercase tracking-wider">
              Wildlife
            </p>
            <div className="flex flex-wrap gap-1.5">
              {safari.wildlife.map((w) => (
                <span
                  key={w}
                  className="px-2.5 py-1 text-xs font-medium bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] rounded-full"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-end justify-between flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
          <div>
            {safari.originalPrice !== safari.discountedPrice && (
              <span className="text-sm text-[var(--color-text-light)] line-through mr-2">
                ${safari.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              ${safari.discountedPrice}
            </span>
            <span className="text-sm text-[var(--color-text-muted)] ml-1">per person</span>
          </div>
          <Link href="/rooms/reserve" className="btn btn-primary text-sm">
            Book Safari
          </Link>
        </div>
      </div>
    </article>
  );
}
