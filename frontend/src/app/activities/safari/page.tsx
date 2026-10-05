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
        backgroundImage="/about/i3.webp"
        backgroundPosition="center 30%"
        primaryCta={{ label: "Book Safari", href: "/contact" }}
        backLink={{ label: "All Activities", href: "/activities" }}
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

      {/* ── CTA Section (Featuring User's Elephant Gathering with Full Visibility) ── */}
      <section className="relative min-h-[340px] md:min-h-[380px] pt-10 md:pt-14 pb-12 md:pb-14 flex items-center justify-center overflow-hidden">
        {/* Background Image: 16:9 Elephant Gathering */}
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url('/CTA.webp')",
            backgroundPosition: "center 48%",
          }}
        />

        {/* Cinematic Vignette Overlay: Light in the middle so the elephants stay visible, darker top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80" />

        {/* Content Container */}
        <div className="relative z-10 section-container text-center max-w-2xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/40 mb-2.5 shadow-lg">
            <span>🐘</span>
            <span>Wild Safari Adventures</span>
          </span>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold !text-white tracking-tight drop-shadow-2xl mb-2.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for the Adventure?
          </h2>

          <p className="!text-white max-w-lg mx-auto mb-6 text-sm sm:text-base font-light leading-relaxed drop-shadow-lg">
            Send us a reservation request and our experienced safari team will arrange the perfect wildlife adventure for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 !bg-[#d4a34a] hover:!bg-[#b8872e] !text-slate-950 font-bold px-7 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base text-center"
            >
              <span>Book Safari</span>
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/50 hover:bg-black/70 !text-white border border-white/50 backdrop-blur-md font-semibold px-7 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base text-center shadow-lg"
            >
              <span>Have Questions?</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
