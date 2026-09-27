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
        backgroundImage="/about-hero.jpg"
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
                  src={about.image || "/sigiriya.jpg"}
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
                    ? "/highlight-rock.jpg"
                    : f.icon === "wildlife"
                    ? "/highlight-safari.jpeg"
                    : f.icon === "village"
                    ? "/highlight-village.jpg"
                    : f.icon === "sunrise"
                    ? "/highlight-sunrise.jpeg"
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

      {/* ── Stats ── */}
      {stats && stats.items.length > 0 && (
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2000&q=80)",
            }}
          />
          <div className="gradient-overlay absolute inset-0" style={{ background: "rgba(15, 61, 27, 0.88)" }} />
          <div className="relative z-10 section-container">
            <SectionTitle
              eyebrow={stats.eyebrow}
              title={stats.title}
              description={stats.description}
              light
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.items.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {s.value}{s.suffix}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
                  <p className="text-white/60 text-xs leading-relaxed hidden sm:block">
                    {s.description}
                  </p>
                </div>
              ))}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {gallery.items.map((item) => (
                <div
                  key={item.title}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-bg-alt)]"
                >
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-accent)]/15 flex items-center justify-center">
                    <span className="text-4xl">📸</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white text-sm font-medium p-3 md:p-4">
                      {item.title}
                    </p>
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
    </>
  );
}
