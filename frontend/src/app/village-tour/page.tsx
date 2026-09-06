import type { Metadata } from "next";
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
        backgroundImage="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
        primaryCta={{ label: "Book This Tour", href: "/rooms/reserve" }}
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
              {villageTour.includedActivities.map((act) => (
                <div
                  key={act.title}
                  className="bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/10 flex items-center justify-center">
                    <span className="text-5xl">
                      {act.title.toLowerCase().includes("cart") && "🛒"}
                      {act.title.toLowerCase().includes("boat") && "🚣"}
                      {!act.title.toLowerCase().includes("cart") && !act.title.toLowerCase().includes("boat") && "🌿"}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {act.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
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
            Experience Village Life
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm sm:text-base">
            Immerse yourself in Sri Lankan culture with our guided village tour. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/rooms/reserve" className="btn btn-accent btn-lg w-full sm:w-auto">
              Book This Tour
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg w-full sm:w-auto">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
