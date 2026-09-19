"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Activity, Safari } from "@/types";

interface ActivitiesBentoGridProps {
  activities?: Activity[];
  safaris?: Safari[];
}

export default function ActivitiesBentoGrid({
  activities = [],
  safaris = [],
}: ActivitiesBentoGridProps) {
  const [isMainMuted, setIsMainMuted] = useState(true);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  // Active safari from backend if available
  const featuredSafari = safaris.find((s) => s.isActive) || safaris[0];

  // Find backend activity data if provided
  const villageActivity = activities.find((a) =>
    a.title.toLowerCase().includes("village")
  );
  const foodActivity = activities.find((a) =>
    a.title.toLowerCase().includes("food")
  );
  const safariActivity = activities.find((a) =>
    a.title.toLowerCase().includes("safari") || a.title.toLowerCase().includes("jeep")
  );

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = !isMainMuted;
      setIsMainMuted(!isMainMuted);
    }
  };

  return (
    <section className="section-padding bg-[var(--color-bg-alt)] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Our Experiences"
          title="Activities & Adventures"
          description="Explore safaris, village tours, and local cuisine — all crafted for an unforgettable Minneriya experience."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mt-8">
          
          {/* ═══════════════════════════════════════════
              CARD 1: JEEP SAFARI (Main Featured - Col 7)
             ═══════════════════════════════════════════ */}
          <div className="lg:col-span-7 group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-between border border-white/20">
            {/* Background Video */}
            <video
              ref={mainVideoRef}
              autoPlay
              loop
              muted={isMainMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              poster="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80"
            >
              <source src="/videos/safari.mp4" type="video/mp4" />
              <source src="/videos/safari.webm" type="video/webm" />
              <source src="/videos/safari-sample.webm" type="video/webm" />
            </video>

            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 transition-opacity duration-300" />

            {/* Top Badges & Controls */}
            <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white shadow-sm backdrop-blur-md">
                  <span>🔥</span>
                  <span>Most Popular</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-black/40 text-white/90 backdrop-blur-md border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Video Preview</span>
                </span>
              </div>

              {/* Mute / Unmute Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMainMuted ? "Unmute video" : "Mute video"}
                className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white/90 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              >
                {isMainMuted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-5 sm:p-7 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-accent-light)]">
                  Wildlife Adventure
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs text-amber-300 font-medium">★ 4.9 (140+ reviews)</span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-bold !text-white mb-2 group-hover:!text-[var(--color-accent-light)] transition-colors drop-shadow-md"
                style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
              >
                {featuredSafari?.title || safariActivity?.title || "Minneriya Jeep Safari"}
              </h3>

              <p className="text-white/80 text-sm sm:text-base line-clamp-2 max-w-xl mb-4 leading-relaxed font-light">
                {featuredSafari?.description ||
                  safariActivity?.shortDescription ||
                  "Witness the legendary Gathering of wild elephants, leopards, and tropical wildlife across the scenic Minneriya grasslands."}
              </p>

              {/* Highlights Pill Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-2.5 py-1 text-xs rounded-lg bg-white/10 backdrop-blur-md text-white/90 border border-white/10">
                  ⏱ {featuredSafari?.duration || "3–4 Hours"}
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-white/10 backdrop-blur-md text-white/90 border border-white/10">
                  🚙 4x4 Safari Jeep
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-white/10 backdrop-blur-md text-white/90 border border-white/10">
                  🐘 Elephant Gathering
                </span>
              </div>

              {/* Price & Link CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-white/15">
                <div>
                  <span className="text-xs text-white/60 block uppercase">Starting from</span>
                  <span className="text-xl sm:text-2xl font-bold text-[var(--color-accent-light)]">
                    {featuredSafari?.discountedPrice ? `$${featuredSafari.discountedPrice}` : safariActivity?.price || "$45"}
                  </span>
                  <span className="text-xs text-white/70 ml-1">/ person</span>
                </div>

                <Link
                  href="/activities/safari"
                  className="btn btn-accent inline-flex items-center gap-2 text-sm font-semibold shadow-md group-hover:shadow-lg transition-transform group-hover:translate-x-1"
                >
                  <span>Explore Safari</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              RIGHT COLUMN: CARDS 2 & 3 (Col 5)
             ═══════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">

            {/* ── CARD 2: VILLAGE TOUR ── */}
            <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[260px] sm:min-h-[275px] flex flex-col justify-between border border-white/20">
              {/* Background Video / Poster */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                poster="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80"
              >
                <source src="/videos/village.mp4" type="video/mp4" />
                <source src="/videos/village.webm" type="video/webm" />
                <source src="/videos/village-sample.webm" type="video/webm" />
              </video>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

              {/* Top Bar */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white shadow-sm backdrop-blur-md">
                  <span>🌿</span>
                  <span>Cultural Experience</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/40 text-white/80 backdrop-blur-md border border-white/10">
                  {villageActivity?.duration || "Full Day"}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-6 text-white">
                <h3
                  className="text-xl sm:text-2xl font-bold mb-1.5 !text-white group-hover:!text-[var(--color-accent-light)] transition-colors drop-shadow-md"
                  style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
                >
                  {villageActivity?.title || "Authentic Village Tours"}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed font-light">
                  {villageActivity?.shortDescription ||
                    "Glide across tranquil lakes in a catamaran boat, ride a traditional cart, and experience genuine rural Sri Lankan hospitality."}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <span className="text-sm font-semibold text-[var(--color-accent-light)]">
                    {villageActivity?.price || "8$ per group"}
                  </span>

                  <Link
                    href="/activities/village-tour"
                    className="text-xs sm:text-sm font-semibold text-white group-hover:text-[var(--color-accent-light)] flex items-center gap-1 transition-colors"
                  >
                    <span>Discover Village</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── CARD 3: LOCAL FOOD ── */}
            <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[260px] sm:min-h-[275px] flex flex-col justify-between border border-white/20">
              {/* Background Video / Poster */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                poster="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80"
              >
                <source src="/videos/food.mp4" type="video/mp4" />
                <source src="/videos/food.webm" type="video/webm" />
                <source src="/videos/food-sample.webm" type="video/webm" />
              </video>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

              {/* Top Bar */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-600/90 text-white shadow-sm backdrop-blur-md">
                  <span>🍛</span>
                  <span>Authentic Cuisine</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/40 text-white/80 backdrop-blur-md border border-white/10">
                  Wood-Fire Cooking
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-6 text-white">
                <h3
                  className="text-xl sm:text-2xl font-bold mb-1.5 !text-white group-hover:!text-[var(--color-accent-light)] transition-colors drop-shadow-md"
                  style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
                >
                  {foodActivity?.title || "Traditional Sri Lankan Dining"}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed font-light">
                  {foodActivity?.shortDescription ||
                    "Taste aromatic curries, freshly prepared rotis, and organic tropical flavors cooked in traditional clay pots over open hearths."}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <span className="text-sm font-semibold text-[var(--color-accent-light)]">
                    {foodActivity?.price || "Fresh & Authentic"}
                  </span>

                  <Link
                    href="/activities/local-food"
                    className="text-xs sm:text-sm font-semibold text-white group-hover:text-[var(--color-accent-light)] flex items-center gap-1 transition-colors"
                  >
                    <span>Taste Experience</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* View All Activities CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/activities"
            className="btn btn-primary inline-flex items-center gap-2 text-sm sm:text-base px-6 py-3 shadow-md hover:shadow-lg transition-all"
          >
            <span>View All Activities & Packages</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
