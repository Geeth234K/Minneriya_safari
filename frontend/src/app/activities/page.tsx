import type { Metadata } from "next";
import Link from "next/link";
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
    fallbackTitle: "Jeep Safari",
    fallbackDescription:
      "Venture into Minneriya National Park and witness elephants, leopards, and exotic birds in their natural habitat.",
    gradient: "from-[#1a5c2a] to-[#0f3d1b]",
  },
  {
    slug: "/activities/village-tour",
    icon: "🏘️",
    keyword: "village",
    fallbackTitle: "Village Tour",
    fallbackDescription:
      "Immerse yourself in authentic Sri Lankan village life with cart rides, boat rides, and cultural experiences.",
    gradient: "from-[#b8872e] to-[#8b6914]",
  },
  {
    slug: "/activities/local-food",
    icon: "🍛",
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
        backgroundImage="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=2000&q=80"
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
                <div
                  className={`relative h-48 sm:h-56 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                >
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-3xl">{card.icon}</span>
                    </div>
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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

      {/* CTA */}
      <section className="section-padding bg-[var(--color-primary-dark)] text-white text-center">
        <div className="section-container">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for an Adventure?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm sm:text-base">
            Combine safari, village tours, and local food into one unforgettable
            Minneriya experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/rooms/reserve"
              className="btn btn-accent btn-lg w-full sm:w-auto"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="btn btn-outline btn-lg w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
