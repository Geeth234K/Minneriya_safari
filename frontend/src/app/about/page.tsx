import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import { getAboutData } from "@/services/about";
import { ErrorState } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Minneriya Safari — your gateway to Sri Lankan wildlife, village experiences, and authentic hospitality near Minneriya National Park.",
};

export default async function AboutPage() {
  let aboutData;
  try {
    aboutData = await getAboutData();
  } catch {
    return (
      <div className="pt-20">
        <ErrorState message="Unable to load about page content." />
      </div>
    );
  }

  const { about, features, stats, gallery, whyVisit } = aboutData;

  return (
    <>
      {/* Hero */}
      <Hero
        title="Discover the Wonder of Minneriya"
        subtitle="Minneriya is where royal history, lush jungles, wildlife corridors, and safari adventures blend into an unforgettable journey."
        badge="About Minneriya Safari"
        backgroundImage="/about-hero.webp"
        highlights={["UNESCO Heritage", "Wildlife Safaris", "Cultural Immersion", "Luxury Escapes"]}
        compact
      />

      {/* ── About Section ── */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image side */}
            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                <Image
                  src={about.image || "/sigiriya.webp"}
                  alt={about.imageAlt || "Sigiriya rock fortress and water gardens"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {about.caption && (
                  <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 pointer-events-none">
                    <p className="text-xs md:text-sm text-white/95 leading-relaxed bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10 inline-block shadow-sm">
                      {about.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Text side */}
            <div>
              <SectionTitle
                eyebrow={about.eyebrow}
                title={about.title}
                centered={false}
              />
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                {about.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {about.highlights.map((h) => (
                  <div key={h.title} className="p-4 rounded-lg bg-[var(--color-bg-alt)]">
                    <h4
                      className="font-semibold text-sm mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {h.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {h.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      {features && features.items.length > 0 && (
        <section className="section-padding bg-[var(--color-bg-alt)]">
          <div className="section-container">
            <SectionTitle
              eyebrow={features.eyebrow}
              title={features.title}
              description={features.description}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.items.map((f) => {
                const featureImage =
                  f.image ||
                  (f.icon === "lion"
                    ? "/highlight-rock.webp"
                    : f.icon === "wildlife"
                    ? "/highlight-safari.webp"
                    : f.icon === "village"
                    ? "/highlight-village.webp"
                    : f.icon === "sunrise"
                    ? "/highlight-sunrise.webp"
                    : null);

                const featureLink =
                  f.link ||
                  (f.icon === "wildlife"
                    ? "/activities/safari"
                    : f.icon === "village"
                    ? "/activities/village-tour"
                    : "/activities");

                return (
                  <Link
                    key={f.title}
                    href={featureLink}
                    className="group bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                  >
                    {featureImage ? (
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[var(--color-bg-alt)]">
                        <Image
                          src={featureImage}
                          alt={f.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-base shadow-sm border border-white/15">
                          {f.icon === "lion" && "🦁"}
                          {f.icon === "wildlife" && "🐘"}
                          {f.icon === "village" && "🏘️"}
                          {f.icon === "sunrise" && "🌅"}
                          {!["lion", "wildlife", "village", "sunrise"].includes(f.icon) && "✨"}
                        </span>
                      </div>
                    ) : (
                      <div className="w-14 h-14 mx-auto mt-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          className="font-bold text-base mb-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {f.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                          {f.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 flex items-center text-xs font-semibold text-[var(--color-accent)] group-hover:translate-x-1 transition-transform">
                        <span>Explore Experience</span>
                        <span className="ml-1 text-sm">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      {gallery && gallery.items.length > 0 && (
        <section className="section-padding bg-[var(--color-bg)]">
          <div className="section-container">
            <SectionTitle
              eyebrow={gallery.eyebrow}
              title={gallery.title}
              description={gallery.description}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {gallery.items.map((item) => (
                <div
                  key={item.title}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-bg-alt)] border border-[var(--color-border)] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt || item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center">
                      <span className="text-4xl">📸</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 sm:p-5">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--color-accent-light)] mb-1">
                      Guest Moment
                    </span>
                    <h4
                      className="!text-white text-sm sm:text-base font-bold leading-snug drop-shadow-md"
                      style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why Visit ── */}
      {whyVisit && whyVisit.items.length > 0 && (
        <section className="section-padding bg-[var(--color-bg-alt)]">
          <div className="section-container">
            <SectionTitle
              eyebrow={whyVisit.eyebrow}
              title="Reasons Travelers Love Minneriya"
              description={whyVisit.description}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {whyVisit.items.map((r) => (
                <div
                  key={r.title}
                  className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)] hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-3">
                    <span className="text-lg">
                      {r.icon === "culture" && "🏛️"}
                      {r.icon === "wildlife" && "🐘"}
                      {r.icon === "eco" && "🌿"}
                      {r.icon === "family" && "👨‍👩‍👧‍👦"}
                      {r.icon === "landscape" && "🏞️"}
                      {!["culture", "wildlife", "eco", "family", "landscape"].includes(r.icon) && "✨"}
                    </span>
                  </div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Section (Matching Home Page with User's Elephant Gathering) ── */}
      <section className="relative min-h-[460px] md:min-h-[520px] py-20 md:py-28 flex items-center justify-center overflow-hidden">
        {/* Background Image: 16:9 Elephant Gathering */}
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url('/CTA.webp')",
            backgroundPosition: "center 42%",
          }}
        />

        {/* Cinematic Vignette Overlay: Light in the middle, darker top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80" />

        <div className="relative z-10 section-container text-center max-w-2xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/40 mb-3.5 shadow-lg">
            <span>🐘</span>
            <span>Unforgettable Wildlife Encounters</span>
          </span>

          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold !text-white tracking-tight drop-shadow-2xl mb-3.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for an Unforgettable Minneriya Safari?
          </h2>
          <p className="!text-white max-w-lg mx-auto mb-6 text-sm sm:text-base md:text-lg font-light leading-relaxed drop-shadow-lg">
            Discover Sri Lanka&apos;s greatest wildlife gathering with respectful local trackers and bespoke 4x4 safaris.
          </p>

          {/* Prominent Trust Badges */}
          {stats && stats.items.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-7">
              {stats.items.map((s) => (
                <div
                  key={s.label}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/25 shadow-md text-white"
                >
                  <span className="text-sm sm:text-base font-extrabold text-[#e8c372] tracking-wide">
                    {s.value}
                    {s.suffix}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white/95">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 !bg-[#d4a34a] hover:!bg-[#b8872e] !text-slate-950 font-bold px-7 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base text-center"
            >
              <span>Book Safari Now</span>
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/50 hover:bg-black/70 !text-white border border-white/50 backdrop-blur-md font-semibold px-7 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base text-center shadow-lg"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
