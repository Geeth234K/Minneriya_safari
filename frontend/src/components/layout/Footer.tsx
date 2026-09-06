import Link from "next/link";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/safari", label: "Safari Experience" },
  { href: "/village-tour", label: "Village Tour" },
  { href: "/local-food", label: "Local Food" },
  { href: "/rooms", label: "Accommodation" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-sm">
                MS
              </div>
              <span
                className="font-bold text-xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Minneriya Safari
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Experience the wild beauty of Minneriya with authentic safari
              adventures, village tours, and traditional Sri Lankan hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold text-[var(--color-accent)] mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-[var(--color-accent)] mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Minneriya, Sri Lanka</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@minneriyasafari.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+94 77 123 4567</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3
              className="font-semibold text-[var(--color-accent)] mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Explore?
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Book your Minneriya Safari adventure today and create memories
              that last a lifetime.
            </p>
            <Link href="/rooms/reserve" className="btn btn-accent text-sm">
              Book Now
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Minneriya Safari. All rights
            reserved.
          </p>
          <p className="text-white/50 text-xs">
            Minneriya, Sri Lanka &mdash; Wildlife &amp; Hospitality
          </p>
        </div>
      </div>
    </footer>
  );
}
