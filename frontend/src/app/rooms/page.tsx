import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import CottageGallery from "@/components/rooms/CottageGallery";
import { ErrorState } from "@/components/ui/States";
import { getRooms } from "@/services/rooms";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rooms & Accommodation",
  description:
    "Stay in comfortable accommodation near Minneriya National Park. Book your room and wake up to the sounds of nature in the heart of Sri Lanka.",
};

export default async function RoomsPage() {
  let rooms;
  try {
    rooms = await getRooms();
  } catch {
    return (
      <div className="pt-20">
        <ErrorState message="Unable to load room information." />
      </div>
    );
  }

  const primaryRoom = rooms?.[0];
  const price = 18;

  return (
    <>
      <Hero
        title="Stay in the Heart of Nature"
        subtitle="Wake up to the sounds of wildlife and enjoy comfortable accommodation just minutes from Minneriya National Park."
        badge="Eco-Lodge Accommodation"
        backgroundImage="/rooms/r4.jpeg"
        primaryCta={{ label: "Reserve Your Stay", href: "/rooms/reserve" }}
        compact
      />

      {/* Boutique Safari Cottage Showcase */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="Authentic Accommodation"
            title="Private Safari Chalet & Treehouse Retreat"
            description="A peaceful, eco-friendly haven nestled within lush tropical gardens just 5 minutes from Minneriya National Park. Relax in comfort after an unforgettable wildlife safari."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Left: Interactive 4-Photo Gallery */}
            <div className="lg:col-span-7">
              <CottageGallery />
            </div>

            {/* Right: Chalet Details & Reservation Card */}
            <div className="lg:col-span-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    Entire Chalet & Garden
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-muted)] flex items-center gap-1">
                    <span className="text-amber-500">★</span> 4.9 Guest Rating
                  </span>
                </div>
                <h3
                  className="text-2xl font-bold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Deluxe Eco-Safari Chalet
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                  Authentic private timber chalet featuring air conditioning (A/C), two spacious double beds, attached bathroom, garden veranda, and an observation treehouse.
                </p>
              </div>

              {/* Price Tag */}
              <div className="p-4 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-3xl font-extrabold text-[var(--color-primary)]">
                    ${price}
                  </span>
                  <span className="text-sm text-[var(--color-text-muted)] ml-1.5">
                    / night
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 px-2.5 py-1 rounded-full">
                    ❄️ A/C Included
                  </span>
                  <span className="text-xs font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-1 rounded-full">
                    Breakfast Included
                  </span>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Chalet Highlights
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-text)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-base leading-none text-[var(--color-primary)]">❄️</span>
                    <div>
                      <strong className="font-semibold">Air Conditioning (A/C):</strong> Fully air-conditioned bedroom for a cool, refreshing sleep after your safari.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-base leading-none text-[var(--color-primary)]">🛏️</span>
                    <div>
                      <strong className="font-semibold">Two Double/Queen Beds:</strong> High timber ceilings, comfortable mattresses, and fresh linens for up to 4 guests.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-base leading-none text-[var(--color-primary)]">🌳</span>
                    <div>
                      <strong className="font-semibold">Treehouse Lookout:</strong> Elevated observation tower in the garden for birdwatching and scenic views.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-base leading-none text-[var(--color-primary)]">🌿</span>
                    <div>
                      <strong className="font-semibold">Private Garden Veranda:</strong> Shaded front porch overlooking peaceful tropical flowers and lawn.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-base leading-none text-[var(--color-primary)]">🚿</span>
                    <div>
                      <strong className="font-semibold">Private En-suite Bathroom:</strong> Clean private bathroom with shower and fresh towels.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-base leading-none text-[var(--color-primary)]">📍</span>
                    <div>
                      <strong className="font-semibold">5 Mins to Minneriya Park:</strong> Quick access for morning and afternoon elephant safari tours.
                    </div>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="pt-3 border-t border-[var(--color-border)] space-y-2.5">
                <Link
                  href="/rooms/reserve"
                  className="btn btn-primary w-full text-center py-3 text-sm sm:text-base font-bold shadow-md hover:shadow-xl transition-all"
                >
                  Reserve This Chalet Now
                </Link>
                <a
                  href="https://wa.me/94771234567?text=Hello!%20I%20would%20like%20to%20inquire%20about%20booking%20the%20Minneriya%20Safari%20Chalet."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full text-center py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span>💬</span> Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding bg-[var(--color-bg-alt)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="What We Offer"
            title="Your Stay Includes"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { emoji: "🍳", label: "Breakfast Included" },
              { emoji: "🌿", label: "Garden View" },
              { emoji: "🚿", label: "Private Bathroom" },
              { emoji: "🅿️", label: "Free Parking" },
              { emoji: "🛏️", label: "Fresh Linens" },
              { emoji: "🧹", label: "Daily Cleaning" },
              { emoji: "🔑", label: "24/7 Access" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <span className="text-2xl block mb-2">{item.emoji}</span>
                <span className="text-sm font-medium text-[var(--color-text)]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to book */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="How It Works"
            title="Reservation Process"
            description="We use a simple reservation request system to ensure the best experience for our guests."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Submit Request", desc: "Fill out the reservation form with your details." },
              { step: "2", title: "We Review", desc: "Our host checks availability for your dates." },
              { step: "3", title: "Confirmation", desc: "You'll receive confirmation via email or WhatsApp." },
              { step: "4", title: "Enjoy Your Stay", desc: "Arrive and enjoy your Minneriya experience!" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.step}
                </div>
                <h3
                  className="font-bold mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rooms/reserve" className="btn btn-primary btn-lg">
              Submit Reservation Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
