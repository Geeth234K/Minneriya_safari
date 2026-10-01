"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/activities", label: "Activities" },
  { href: "/rooms", label: "Rooms" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <nav className="section-container flex items-center justify-between h-16 md:h-20">
          {/* Official Golden Tusker Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 z-40 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo-mark.webp"
                alt="Minneriya Safari Logo"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-base sm:text-lg transition-colors duration-300 leading-tight ${
                  scrolled ? "text-[var(--color-primary-dark)]" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Minneriya Safari
              </span>
              <span
                className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold transition-colors duration-300 ${
                  scrolled ? "text-amber-600" : "text-amber-300"
                }`}
              >
                Wildlife & Tours
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-accent ml-2 text-sm !py-2 !px-4 shadow-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text)]" : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text)]" : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text)]" : "bg-white"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile Navigation Drawer Backdrop ── */}
      <div
        className={`lg:hidden fixed inset-0 z-[90] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Navigation Drawer Panel ── */}
      <aside
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[100] w-full sm:max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: "100dvh" }}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 bg-white shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/logo-mark.webp"
                alt="Minneriya Safari Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className="font-bold text-base text-[var(--color-primary-dark)] leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Minneriya Safari
              </span>
              <span className="text-[10px] text-amber-600 font-semibold tracking-wider uppercase">
                Wildlife & Tours
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Close navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Navigation
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-base font-semibold text-slate-800 hover:text-[var(--color-primary)] hover:bg-emerald-50/60 py-3 px-3.5 rounded-xl transition-all"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span>{link.label}</span>
              <span className="text-slate-400 text-xs">→</span>
            </Link>
          ))}

          <div className="pt-4 mt-3 border-t border-slate-100">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full !bg-[#1E7145] hover:!bg-[#175836] !text-white flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-base font-semibold shadow-md transition-all text-center"
            >
              <span>🐘</span>
              <span>Book Safari Now</span>
            </Link>
          </div>
        </div>

        {/* Drawer Bottom Contact Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 space-y-2">
          <a
            href="https://wa.me/94704881033?text=Hello!%20I%20would%20like%20to%20inquire%20about%20Minneriya%20Safari."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 py-2.5 px-3 rounded-lg transition-colors w-full"
          >
            <svg className="w-4 h-4 fill-current text-emerald-700 shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp: +94 70 488 1033</span>
          </a>
          <p className="text-[11px] text-center text-slate-400">
            Open 24/7 • Minneriya & Kaudulla, Sri Lanka
          </p>
        </div>
      </aside>
    </>
  );
}
