import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import { ErrorState, EmptyState } from "@/components/ui/States";
import { getActivities } from "@/services/activities";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Village Tour",
  description:
    "Experience authentic Sri Lankan village life near Minneriya. Enjoy cart rides, boat rides, and immerse yourself in local culture and traditions.",
};

export default async function VillageTourPage() {
  let activities;
  try {
    activities = await getActivities();
  } catch {
    return (
      <div className="pt-20">
        <ErrorState message="Unable to load village tour information." />
      </div>
    );
  }

  const villageTour = activities.find((a) =>
    a.title.toLowerCase().includes("village")
  );

  if (!villageTour) {
    return (
      <div className="pt-20">
        <EmptyState message="Village tour information is being updated." />
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Minneriya Village Tour"
        subtitle={villageTour.shortDescription}
        badge="Cultural Experience"
        backgroundImage="/images/village.webp"
        backgroundPosition="center 60%"
        primaryCta={{ label: "Book This Tour", href: "/contact" }}
        backLink={{ label: "All Activities", href: "/activities" }}
        compact
      />

      {/* Overview */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              eyebrow={villageTour.tag}
              title="Explore Village Life"
            />
            <p className="text-[var(--color-text-muted)] leading-relaxed text-center mb-8">
              {villageTour.description}
            </p>

            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {villageTour.duration && (
                <div className="text-center p-4 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
                  <div className="text-2xl mb-1">⏱️</div>
                  <div className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-1">Duration</div>
                  <div className="font-bold text-sm">{villageTour.duration}</div>
                </div>
              )}
              {villageTour.price && (
                <div className="text-center p-4 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
                  <div className="text-2xl mb-1">💰</div>
                  <div className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-1">Price</div>
                  <div className="font-bold text-sm text-[var(--color-primary)]">{villageTour.price}</div>
                </div>
              )}
              {villageTour.groupInfo && (
                <div className="text-center p-4 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-1">Group</div>
                  <div className="font-bold text-sm">{villageTour.groupInfo.length > 40 ? "Private Groups" : villageTour.groupInfo}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Included Activities */}
      {villageTour.includedActivities.length > 0 && (
        <section className="section-padding bg-[var(--color-bg-alt)]">
          <div className="section-container">
            <SectionTitle
              eyebrow="What&apos;s Included"
              title="Tour Activities"
              description="Each village tour includes these authentic experiences."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {villageTour.includedActivities.map((act) => {
                const isBoat = act.title.toLowerCase().includes("boat");
                const isCart = act.title.toLowerCase().includes("cart");
                const activityImage = isBoat
                  ? "/highlight-village.webp"
                  : isCart
                  ? "/images/bullock-cart.webp"
                  : act.image || null;

                return (
                  <div
                    key={act.title}
                    className="group bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-lg transition-all duration-300"
                  >
                    {activityImage ? (
                      <div className="relative h-48 w-full overflow-hidden bg-[var(--color-bg-alt)]">
                        <Image
                          src={activityImage}
                          alt={act.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                          {isBoat ? "🚣 Scenic Catamaran Ride" : isCart ? "🐂 Traditional Bullock Cart" : "Experience"}
                        </span>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/10 flex flex-col items-center justify-center">
                        <span className="text-5xl mb-2">
                          {isCart ? "🐂" : "🌿"}
                        </span>
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                          {isCart ? "Bullock Cart Ride" : act.title}
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <h3
                        className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {act.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
            <span>🌿</span>
            <span>Cultural & Rural Discovery</span>
          </span>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold !text-white tracking-tight drop-shadow-2xl mb-2.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Experience Village Life
          </h2>

          <p className="!text-white max-w-lg mx-auto mb-6 text-sm sm:text-base font-light leading-relaxed drop-shadow-lg">
            Immerse yourself in authentic Sri Lankan culture, scenic catamaran boat rides, and traditional village hospitality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 !bg-[#d4a34a] hover:!bg-[#b8872e] !text-slate-950 font-bold px-7 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base text-center"
            >
              <span>Book This Tour</span>
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/50 hover:bg-black/70 !text-white border border-white/50 backdrop-blur-md font-semibold px-7 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base text-center shadow-lg"
            >
              <span>Ask a Question</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
