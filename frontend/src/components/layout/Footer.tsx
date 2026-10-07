import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/activities", label: "Activities" },
  { href: "/activities/safari", label: "Safari Experience" },
  { href: "/activities/village-tour", label: "Village Tour" },
  { href: "/activities/local-food", label: "Local Food" },
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
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-11 h-11 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo-mark.webp"
                  alt="Minneriya Eco Safari Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold text-xl text-white leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Minneriya Eco Safari
                </span>
                <span className="text-[10px] text-amber-300 font-semibold tracking-widest uppercase">
                  Wildlife & Tours
                </span>
              </div>
            </Link>
            <p className="!text-slate-200 text-sm leading-relaxed max-w-xs">
              Experience the wild beauty of Minneriya with authentic safari
              adventures, village tours, and traditional Sri Lankan hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-bold !text-[#e8c372] mb-4 text-xs sm:text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="!text-slate-100 hover:!text-[#e8c372] text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-amber-400/60 group-hover:text-amber-400 text-xs transition-colors">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-bold !text-[#e8c372] mb-4 text-xs sm:text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-sm !text-slate-100">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-1 shrink-0 text-[#e8c372]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a
                  href="https://maps.app.goo.gl/GqiXALPcQE9wAFCC7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:!text-[#e8c372] transition-colors leading-relaxed"
                >
                  Minneriya / Sigiriya, Sri Lanka
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-1 shrink-0 text-[#e8c372]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:sigiriyawhitelodge@gmail.com"
                  className="hover:!text-[#e8c372] transition-colors break-all leading-relaxed"
                >
                  sigiriyawhitelodge@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-1 shrink-0 text-[#e8c372]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="https://wa.me/94762838796?text=Hello!%20I'm%20interested%20in%20Minneriya%20safari%20tours%20and%20would%20like%20more%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:!text-[#e8c372] transition-colors font-semibold text-emerald-300"
                >
                  +94 76 283 8796
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3
              className="font-bold !text-[#e8c372] mb-4 text-xs sm:text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Explore?
            </h3>
            <p className="!text-slate-100 text-sm mb-5 leading-relaxed">
              Book your Minneriya Eco Safari adventure today and create memories
              that last a lifetime.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 !bg-[#d4a34a] hover:!bg-[#b8872e] !text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all text-sm"
            >
              <span>Book Safari Now</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="!text-slate-200">
            &copy; {new Date().getFullYear()} Minneriya Eco Safari. All rights reserved.
          </p>
          <p className="!text-slate-200 flex items-center gap-1.5">
            <span>Crafted with passion by</span>
            <span className="font-semibold text-amber-400 hover:text-amber-300 transition-colors tracking-wide">
              Ceylonix
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
