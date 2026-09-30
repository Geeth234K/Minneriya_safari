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
        backgroundImage="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2000&q=80"
        compact
      />

      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <SectionTitle
                eyebrow="Reach Us"
                title="Contact Information"
                centered={false}
              />

              <div className="space-y-6">
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
                      className="group inline-block"
                    >
                      <p className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                        Wild Life Eco Jeep Safari,<br />
                        Minneriya / Sigiriya, Sri Lanka
                      </p>
                      <span className="text-xs text-[var(--color-accent)] font-medium underline flex items-center gap-1 mt-0.5 group-hover:opacity-80">
                        View on Google Maps →
                      </span>
                    </a>
                  </div>
                </div>

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
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors break-all"
                    >
                      sigiriyawhitelodge@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Phone / WhatsApp</h3>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+94762838796"
                        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors font-medium"
                      >
                        +94 76 283 8796
                      </a>
                      <a
                        href="https://wa.me/94762838796?text=Hi%20Minneriya%20Safari%2C%20I%20would%20like%20to%20inquire%20about%20safari%20tours"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        <span>Chat on WhatsApp →</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Hours</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Available 7 days a week<br />
                      6:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 sm:p-8 shadow-sm">
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
