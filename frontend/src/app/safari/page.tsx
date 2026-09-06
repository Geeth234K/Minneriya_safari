import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import SafariCard from "@/components/ui/SafariCard";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { getSafaris } from "@/services/safaris";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safari",
  description:
    "Book an unforgettable jeep safari in Minneriya. Spot elephants, leopards, deer, and exotic birds with experienced local guides.",
};

export default async function SafariPage() {
  let safaris;
  try {
    safaris = await getSafaris();
  } catch {
    return (
      <div className="pt-20">
        <ErrorState message="Unable to load safari packages." />
      </div>
    );
  }

  const activeSafaris = safaris.filter((s) => s.isActive);

  return (
    <>
      <Hero
        title="Minneriya Jeep Safari"
        subtitle="Venture deep into the wild landscapes of Minneriya and witness Sri Lanka's most magnificent wildlife in their natural habitat."
        badge="Safari Experience"
        backgroundImage="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80"
        primaryCta={{ label: "Book Safari", href: "/rooms/reserve" }}
        compact
      />

      {/* Packages */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="Our Packages"
            title="Safari Experiences"
            description="Choose from our expertly crafted safari packages, led by experienced local guides who know every trail."
          />

          {activeSafaris.length > 0 ? (
            <div className="space-y-8 max-w-3xl mx-auto">
              {activeSafaris.map((safari) => (
                <SafariCard key={safari._id} safari={safari} featured />
              ))}
            </div>
          ) : (
            <EmptyState message="Safari packages are being updated. Please check back soon." />
          )}
        </div>
      </section>

      {/* What to bring */}
      {activeSafaris.length > 0 && activeSafaris[0].whatToBring.length > 0 && (
        <section className="section-padding bg-[var(--color-bg-alt)]">
          <div className="section-container">
            <SectionTitle
              eyebrow="Be Prepared"
              title="What to Bring"
              description="Make the most of your safari experience with these essentials."
            />
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {activeSafaris[0].whatToBring.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-text)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-[var(--color-primary-dark)] text-white text-center">
        <div className="section-container">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for the Adventure?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm sm:text-base">
            Send us a reservation request and our team will arrange the perfect safari experience for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/rooms/reserve" className="btn btn-accent btn-lg w-full sm:w-auto">
              Book Now
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg w-full sm:w-auto">
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
