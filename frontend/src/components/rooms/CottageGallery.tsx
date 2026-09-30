"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface GalleryPhoto {
  src: string;
  title: string;
  tag: string;
  description: string;
}

const PHOTOS: GalleryPhoto[] = [
  {
    src: "/rooms/r1.webp",
    title: "Eco-Chalet & Treehouse",
    tag: "Exterior View",
    description: "Private wooden veranda, manicured lawn, and authentic treehouse lookout.",
  },
  {
    src: "/rooms/r2.webp",
    title: "Spacious Bedroom Suite",
    tag: "Interior",
    description: "Two comfortable double beds, wooden beam ceiling, ceiling fan, and en-suite bathroom.",
  },
  {
    src: "/rooms/r3.webp",
    title: "Tropical Garden Pathway",
    tag: "Garden & Grounds",
    description: "Lush pathway surrounded by native flora, palm trees, and outdoor lanterns.",
  },
  {
    src: "/rooms/r4.webp",
    title: "Porch & Nature Setting",
    tag: "Nature Vibe",
    description: "Rustic wooden details and serene open spaces for true jungle tranquility.",
  },
];

export default function CottageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activePhoto = PHOTOS[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === PHOTOS.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  return (
    <div className="space-y-4">
      {/* Main Image Showcase */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[var(--color-bg-alt)] border border-[var(--color-border)] shadow-xl group">
        <Image
          src={activePhoto.src}
          alt={activePhoto.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-102 cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

        {/* Badge & Caption */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md !text-white border border-white/20">
            {activePhoto.tag}
          </span>
        </div>

        {/* Expand / Fullscreen Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 hover:bg-black/80 backdrop-blur-md !text-white border border-white/20 flex items-center gap-1.5 transition-all"
          aria-label="View photo in fullscreen"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span className="hidden sm:inline">View Full</span>
        </button>

        {/* Prev / Next Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-4 pointer-events-none z-10">
          <button
            type="button"
            onClick={handlePrev}
            className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-95"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom Description */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10">
          <h3
            className="text-xl sm:text-2xl font-bold !text-white mb-1 drop-shadow-md"
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
          >
            {activePhoto.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-xl drop-shadow">
            {activePhoto.description}
          </p>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {PHOTOS.map((photo, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 group text-left ${
                isActive
                  ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/40 scale-[1.02]"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-[var(--color-border)]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 25vw, 15vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-1 left-1.5 right-1.5 hidden sm:block">
                <span className="text-[10px] font-semibold !text-white truncate block drop-shadow">
                  {photo.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white z-20">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                Photo {activeIndex + 1} of {PHOTOS.length}
              </span>
              <h4 className="text-lg sm:text-xl font-bold !text-white">{activePhoto.title}</h4>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              aria-label="Close fullscreen view"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lightbox Image Stage */}
          <div className="relative flex-1 w-full my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Modal Prev / Next Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Lightbox Footer & Thumbnail Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white max-w-5xl mx-auto w-full">
            <p className="text-xs sm:text-sm text-gray-300 text-center sm:text-left">
              {activePhoto.description}
            </p>
            <div className="flex items-center gap-2">
              {PHOTOS.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === activeIndex ? "bg-[var(--color-accent)] scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
