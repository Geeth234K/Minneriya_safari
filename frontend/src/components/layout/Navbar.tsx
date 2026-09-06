"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/safari", label: "Safari" },
  { href: "/village-tour", label: "Village Tour" },
  { href: "/local-food", label: "Local Food" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "var(--color-primary)" }}
          >
            MS
          </div>
          <span
            className={`font-bold text-lg transition-colors duration-300 ${
              scrolled || isOpen ? "text-[var(--color-primary-dark)]" : "text-white"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Minneriya Safari
          </span>
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
            href="/rooms/reserve"
            className="btn btn-accent ml-2 text-sm !py-2 !px-4"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
              isOpen
                ? "rotate-45 translate-y-2 bg-[var(--color-text)]"
                : scrolled
                ? "bg-[var(--color-text)]"
                : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
              isOpen
                ? "opacity-0"
                : scrolled
                ? "bg-[var(--color-text)]"
                : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
              isOpen
                ? "-rotate-45 -translate-y-2 bg-[var(--color-text)]"
                : scrolled
                ? "bg-[var(--color-text)]"
                : "bg-white"
            }`}
          />
        </button>

        {/* Mobile overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] py-3 px-6 rounded-lg transition-colors"
              style={{
                fontFamily: "var(--font-heading)",
                animationDelay: `${i * 50}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/rooms/reserve"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary btn-lg mt-4"
          >
            Book Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
