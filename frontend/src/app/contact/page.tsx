import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Minneriya Safari. Send us your inquiry about safaris, village tours, accommodation, or any other questions.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get In Touch"
        subtitle="Have questions about our safari experiences, village tours, or accommodation? We'd love to hear from you."
        badge="Contact Us"
        backgroundImage="/contact-hero.webp"
        backgroundPosition="center 60%"
        compact
      />

      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <SectionTitle
                eyebrow="Reach Us"
                title="Contact Information"
                centered={false}
              />

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Location</h3>
                    <a
                      href="https://maps.app.goo.gl/GqiXALPcQE9wAFCC7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors leading-relaxed block"
                    >
                      Wild Life Eco Jeep Safari,<br />
                      Minneriya / Sigiriya, Sri Lanka
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Email</h3>
                    <a
                      href="mailto:sigiriyawhitelodge@gmail.com"
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors break-all block"
                    >
                      sigiriyawhitelodge@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Phone</h3>
                    <a
                      href="tel:+94704881033"
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors block"
                    >
                      +94 70 488 1033
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-[var(--color-primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                      <path d="M9.5 9.5c.3-.3.8-.3 1.1 0l1 1c.3.3.3.8 0 1.1l-.6.6c-.2.2-.2.5 0 .7 1 1.2 2.1 2.3 3.3 3.3.2.2.5.2.7 0l.6-.6c.3-.3.8-.3 1.1 0l1 1c.3.3.3.8 0 1.1l-.8.8c-.8.8-2 .9-3 .3-2.6-1.5-4.8-3.7-6.3-6.3-.6-1-.5-2.2.3-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/94704881033?text=Hello!%20I'm%20interested%20in%20Minneriya%20safari%20tours%20and%20would%20like%20more%20details."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors block"
                    >
                      +94 70 488 1033
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Hours</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      Available 7 days a week<br />
                      24 Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
                    Instant Inquiry & Custom Itinerary
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Build Your Safari Experience
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1.5">
                    Customize your safari adventure below and receive instant confirmation directly on WhatsApp.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
