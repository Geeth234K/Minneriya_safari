"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";

interface SafariMoment {
  id: string;
  title: string;
  tag: string;
  description: string;
  videoSrc: string;
  thumbnail: string;
  duration: string;
}

const SAFARI_MOMENTS: SafariMoment[] = [
  {
    id: "m4",
    title: "Gentle Giants Up Close",
    tag: "Thrilling Encounter",
    description:
      "A peaceful herd calmly approaching the shaded jeep trail in total tranquility — pure harmony in the wild.",
    videoSrc: "/videos/v5.mov",
    thumbnail: "/videos/thumbs/v5.mov.webp",
    duration: "0:14",
  },
  {
    id: "m1",
    title: "Stream Crossing with Our Guests",
    tag: "Guest Experience",
    description:
      "Guests in our open-top 4x4 watching a gentle elephant family safely cross the riverbank right before their eyes.",
    videoSrc: "/videos/v7.mov",
    thumbnail: "/videos/thumbs/v7.mov.webp",
    duration: "0:07",
  },
  {
    id: "m2",
    title: "Playful Calves by the Lake",
    tag: "Heart-Melting Moment",
    description:
      "Baby elephants playfully wrestling and rolling in the soft grass along the shores of Minneriya reservoir.",
    videoSrc: "/videos/v13.mov",
    thumbnail: "/videos/thumbs/v13.mov.webp",
    duration: "0:10",
  },
  {
    id: "m3",
    title: "Sunset Over the Sanctuary",
    tag: "Golden Hour View",
    description:
      "An unforgettable sunset from a high rock lookout as golden evening light envelops the Minneriya and Sigiriya jungles.",
    videoSrc: "/videos/v8.mov",
    thumbnail: "/videos/thumbs/v8.mov.webp",
    duration: "0:12",
  },
  {
    id: "m5",
    title: "Open Grassland Safari Drive",
    tag: "Scenic Landscape",
    description:
      "Cruising the expansive green plains where hundreds of elephants gather during the legendary dry season.",
    videoSrc: "/videos/v11.mov",
    thumbnail: "/videos/thumbs/v11.mov.webp",
    duration: "0:09",
  },
  {
    id: "m6",
    title: "Baby Elephant Trail Dash",
    tag: "Playful Wildlife",
    description:
      "A tiny elephant calf joyfully trotting across the road next to its protective mother.",
    videoSrc: "/videos/v4.mov",
    thumbnail: "/videos/thumbs/v4.mov.webp",
    duration: "0:04",
  },
];

const PILLARS = [
  {
    title: "100% Ethical & Wildlife-First",
    badge: "Responsible Safari",
    description:
      "We strictly respect animal behavior — keeping safe distances, killing engines when observing, and never chasing or crowding herds.",
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
  },
  {
    title: "Native Trackers & Naturalists",
    badge: "Local Knowledge",
    description:
      "Born and raised around Minneriya, our certified guides know the daily herd paths, weather signs, and hidden viewpoints.",
    icon: (
      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Custom 4x4 Safari Jeeps",
    badge: "Comfort & Photography",
    description:
      "Shock-absorbing elevated seating, 360° panoramic open-top viewing rails, and canvas sunshades tailored for photography.",
    icon: (
      <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Complimentary Hotel Transfers",
    badge: "Door-to-Door",
    description:
      "Enjoy direct, hassle-free round-trip pickup and drop-off from your hotel in Sigiriya, Habarana, Dambulla, or Minneriya.",
    icon: (
      <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function WhySafariWithUs() {
  const [activeMoment, setActiveMoment] = useState<SafariMoment>(SAFARI_MOMENTS[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSelectMoment = (moment: SafariMoment) => {
    setActiveMoment(moment);
    if (videoRef.current) {
      videoRef.current.src = moment.videoSrc;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="section-padding bg-[var(--color-bg)] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <SectionTitle
          eyebrow="The Minneriya Difference"
          title="Why Safari With Us"
          description="We go beyond ordinary tours to deliver authentic, respectful, and unforgettable wildlife encounters in Sri Lanka's legendary elephant sanctuary."
        />

        {/* ── 4 Pillars Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className="group p-6 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-alt)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[var(--color-bg-alt)] text-[var(--color-text-muted)]">
                    {pillar.badge}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pillar.title}
                </h3>

                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--color-border)]/60 flex items-center text-xs font-semibold text-[var(--color-primary)]">
                <span>Pillar 0{i + 1}</span>
                <span className="ml-auto text-[var(--color-accent-dark)] font-bold">✓ Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Moments in the Wild (Live Video Showcase) ── */}
        <div className="mt-16 lg:mt-24 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                Real Safari Reels
              </span>
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Moments in the Wild
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-1 max-w-xl">
                Raw, unfiltered clips filmed directly by our guests and trackers from our 4x4 open-top safaris.
              </p>
            </div>

            <Link
              href="/activities/safari"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors self-start md:self-auto"
            >
              <span>Explore All Safaris</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Interactive Player & Reels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Main Featured Video Player (Col 7) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              {/* Video Player Container */}
              <div
                className="w-full max-w-[380px] lg:max-w-[420px] aspect-[4/5] sm:aspect-[9/16] max-h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black relative shadow-2xl flex items-center justify-center border border-slate-800/60 cursor-pointer group"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src={activeMoment.videoSrc}
                  poster={activeMoment.thumbnail}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover bg-neutral-950"
                />

                {/* Top Overlay Bar: Live Badge & Sound Toggle */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
                  {/* Reel Indicator Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Safari Reel
                  </span>

                  {/* Sound Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSound();
                    }}
                    className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg pointer-events-auto"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
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

                {/* Subtle Paused Play Icon */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center text-xl shadow-2xl pl-1">
                      ▶
                    </div>
                  </div>
                )}
              </div>

              {/* ── Video Details Card: Cleanly Underneath Video (100% Unobstructed Video) ── */}
              <div className="w-full max-w-[380px] lg:max-w-[420px] mt-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary-dark)] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                    {activeMoment.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Duration: {activeMoment.duration}
                  </span>
                </div>
                <h4
                  className="text-base sm:text-lg font-bold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {activeMoment.title}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1.5 leading-relaxed font-light">
                  {activeMoment.description}
                </p>
              </div>
            </div>

            {/* Reel Thumbnails Selector (Col 5) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Select a Wild Moment to Watch ({SAFARI_MOMENTS.length} Clips)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                {SAFARI_MOMENTS.map((moment) => {
                  const isSelected = activeMoment.id === moment.id;
                  return (
                    <button
                      key={moment.id}
                      type="button"
                      onClick={() => handleSelectMoment(moment)}
                      className={`text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3.5 border cursor-pointer ${
                        isSelected
                          ? "bg-white border-[var(--color-primary)] shadow-md ring-2 ring-[var(--color-primary)]/20"
                          : "bg-white/70 hover:bg-white border-transparent hover:border-[var(--color-border)]"
                      }`}
                    >
                      {/* Video Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-black/10">
                        <Image
                          src={moment.thumbnail}
                          alt={moment.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] ${
                              isSelected ? "bg-[var(--color-primary)]" : "bg-black/60"
                            }`}
                          >
                            ▶
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold text-white bg-black/70 px-1 rounded">
                          {moment.duration}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-dark)] block">
                          {moment.tag}
                        </span>
                        <h5
                          className={`text-sm font-semibold truncate ${
                            isSelected ? "text-[var(--color-primary)] font-bold" : "text-[var(--color-text)]"
                          }`}
                        >
                          {moment.title}
                        </h5>
                        <p className="text-xs text-[var(--color-text-muted)] line-clamp-1 mt-0.5">
                          {moment.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
