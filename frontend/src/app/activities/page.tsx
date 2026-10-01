import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/States";
import { getSafaris } from "@/services/safaris";
import { getActivities } from "@/services/activities";
import type { Safari, Activity } from "@/types";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Explore all experiences at Minneriya — jeep safaris, village tours, and authentic local food. Discover the wild beauty and culture of Sri Lanka.",
};

async function fetchData() {
  const [safarisResult, activitiesResult] = await Promise.allSettled([
    getSafaris(),
    getActivities(),
  ]);

  return {
    safaris:
      safarisResult.status === "fulfilled"
        ? safarisResult.value
        : ([] as Safari[]),
    activities:
      activitiesResult.status === "fulfilled"
        ? activitiesResult.value
        : ([] as Activity[]),
  };
}

const activityCards = [
  {
    slug: "/activities/safari",
    icon: "🐘",
    image: "/about/i3.webp",
    fallbackTitle: "Jeep Safari",
    fallbackDescription:
      "Venture into Minneriya National Park and witness elephants, leopards, and exotic birds in their natural habitat.",
    gradient: "from-[#1a5c2a] to-[#0f3d1b]",
  },
  {
    slug: "/activities/village-tour",
    icon: "🏘️",
    image: "/images/village.webp",
    keyword: "village",
    fallbackTitle: "Village Tour",
    fallbackDescription:
      "Immerse yourself in authentic Sri Lankan village life with cart rides, boat rides, and cultural experiences.",
    gradient: "from-[#b8872e] to-[#8b6914]",
  },
  {
    slug: "/activities/local-food",
    icon: "🍛",
    image: "/images/localfood.webp",
    keyword: "food",
    fallbackTitle: "Local Food",
    fallbackDescription:
      "Taste the vibrant flavors of traditional Sri Lankan cuisine, freshly prepared with local ingredients.",
    gradient: "from-[#c0392b] to-[#922b21]",
  },
];

export default async function ActivitiesPage() {
  const { safaris, activities } = await fetchData();

  const activeSafaris = safaris.filter((s) => s.isActive);
  const villageTour = activities.find((a) =>
    a.title.toLowerCase().includes("village")
  );
  const foodActivity = activities.find((a) =>
    a.title.toLowerCase().includes("food")
  );

  // Build card data from API
  const cards = activityCards.map((card) => {
    if (card.slug === "/activities/safari" && activeSafaris.length > 0) {
      const safari = activeSafaris[0];
      return {
        ...card,
        title: safari.title,
        description: safari.description,
        duration: safari.duration,
        price: `$${safari.discountedPrice}`,
      };
    }
    if (card.keyword === "village" && villageTour) {
      return {
        ...card,
        title: villageTour.title,
        description: villageTour.shortDescription,
        duration: villageTour.duration,
        price: villageTour.price,
      };
    }
    if (card.keyword === "food" && foodActivity) {
      return {
        ...card,
        title: foodActivity.title,
        description: foodActivity.shortDescription,
        duration: foodActivity.duration,
        price: foodActivity.price,
      };
    }
    return {
      ...card,
      title: card.fallbackTitle,
      description: card.fallbackDescription,
      duration: undefined as string | undefined,
      price: undefined as string | undefined,
    };
  });

  if (
    activeSafaris.length === 0 &&
    activities.length === 0
  ) {
    return (
      <div className="pt-20">
        <ErrorState message="Unable to load activities." />
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Our Activities & Experiences"
        subtitle="From thrilling jeep safaris to peaceful village tours and authentic local cuisine — discover everything Minneriya has to offer."
        badge="Activities"
        backgroundImage="/activities-hero.webp"
        highlights={["Safari", "Village Tour", "Local Food"]}
        compact
      />

      {/* Activity Cards */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="What We Offer"
            title="Choose Your Adventure"
            description="Each experience is crafted to connect you with the natural beauty and rich culture of Minneriya."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card) => (
              <Link
                key={card.slug}
                href={card.slug}
                className="group block bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card header */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      unoptimized={card.image.startsWith("http")}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        objectPosition:
                          card.slug === "/activities/safari"
                            ? "center 30%"
                            : card.slug === "/activities/village-tour"
                            ? "center 60%"
                            : "center center",
                      }}
                    />
                  )}
                  {/* Dark gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 pointer-events-none" />

                  {/* Header content & badges */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-sm">
                        {card.icon}
                      </span>
                      {/* Interactive arrow button */}
                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-primary-dark)] transition-all">
                        <svg
                          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-accent)] mb-1 block">
                        Experience
                      </span>
                      <h3
                        className="text-xl font-bold !text-white drop-shadow-md"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 md:p-6">
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-3">
                    {card.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm">
                    {card.duration && (
                      <span className="text-[var(--color-text-light)] flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {card.duration}
                      </span>
                    )}
                    {card.price && (
                      <span className="font-semibold text-[var(--color-primary)]">
                        {card.price}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                    <span className="text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-light)] transition-colors flex items-center gap-1">
                      Learn More
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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

        {/* Content Container */}
        <div className="relative z-10 section-container text-center max-w-2xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-amber-300 border border-amber-400/40 mb-3.5 shadow-lg">
            <span>🐘</span>
            <span>Unforgettable Wildlife Encounters</span>
          </span>

          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold !text-white tracking-tight drop-shadow-2xl mb-3.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for an Adventure?
          </h2>

          <p className="!text-white max-w-lg mx-auto mb-7 text-sm sm:text-base md:text-lg font-light leading-relaxed drop-shadow-lg">
            Combine safari, village tours, and traditional local food into one unforgettable
            Minneriya experience.
          </p>

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
