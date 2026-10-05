import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import MealCard from "@/components/ui/MealCard";
import { ErrorState, EmptyState } from "@/components/ui/States";
import { getActivities } from "@/services/activities";
import { getMeals } from "@/services/meals";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Food",
  description:
    "Taste authentic Sri Lankan cuisine near Minneriya. Freshly prepared rice and curry, hoppers, coconut sambol, and seasonal fruit from local ingredients.",
};

export default async function LocalFoodPage() {
  const [activitiesResult, mealsResult] = await Promise.allSettled([
    getActivities(),
    getMeals(),
  ]);

  const activities =
    activitiesResult.status === "fulfilled" ? activitiesResult.value : [];
  const meals = mealsResult.status === "fulfilled" ? mealsResult.value : [];

  const foodActivity = activities.find((a) =>
    a.title.toLowerCase().includes("food")
  );

  const activeMeals = meals.filter((m) => m.isActive);

  if (!foodActivity && activeMeals.length === 0) {
    return (
      <div className="pt-20">
        <ErrorState message="Unable to load food experience information." />
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Authentic Sri Lankan Cuisine"
        subtitle={
          foodActivity?.shortDescription ||
          "Savor the vibrant flavors of traditional Sri Lankan food, freshly prepared with local ingredients."
        }
        badge="Local Food Experience"
        backgroundImage="/images/localfood.webp"
        primaryCta={{ label: "Book Experience", href: "/contact" }}
        backLink={{ label: "All Activities", href: "/activities" }}
        compact
      />

      {/* Food Experience */}
      {foodActivity && (
        <section className="section-padding bg-[var(--color-bg)]">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <SectionTitle
                eyebrow={foodActivity.tag}
                title="A Taste of Sri Lanka"
              />
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-8">
                {foodActivity.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap justify-center gap-4">
                {foodActivity.duration && (
                  <div className="px-5 py-3 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
                    <div className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-1">Duration</div>
                    <div className="font-bold text-sm">{foodActivity.duration}</div>
                  </div>
                )}
                {foodActivity.price && (
                  <div className="px-5 py-3 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
                    <div className="text-xs text-[var(--color-text-light)] uppercase tracking-wider mb-1">Price</div>
                    <div className="font-bold text-sm text-[var(--color-primary)]">{foodActivity.price}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Meals */}
      {activeMeals.length > 0 && (
        <section className="section-padding bg-[var(--color-bg-alt)]">
          <div className="section-container">
            <SectionTitle
              eyebrow="Our Menu"
              title="Meals We Offer"
              description="Freshly prepared with love using traditional recipes and local ingredients."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {activeMeals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Food highlights */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="Highlights"
            title="What Makes Our Food Special"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: "🌾", title: "Farm Fresh", desc: "Ingredients sourced from local farms and gardens." },
              { emoji: "🍛", title: "Traditional Recipes", desc: "Time-honored Sri Lankan cooking methods and spices." },
              { emoji: "👨‍🍳", title: "Home Cooked", desc: "Prepared with care in our own kitchen, not a restaurant." },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <span className="text-4xl block mb-3">{item.emoji}</span>
                <h3
                  className="font-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <span>🍛</span>
            <span>Authentic Sri Lankan Culinary Journey</span>
          </span>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold !text-white tracking-tight drop-shadow-2xl mb-2.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Taste the Real Sri Lanka
          </h2>

          <p className="!text-white max-w-lg mx-auto mb-6 text-sm sm:text-base font-light leading-relaxed drop-shadow-lg">
            Include local meals in your safari experience for an authentic culinary journey prepared with fresh local ingredients.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 !bg-[#d4a34a] hover:!bg-[#b8872e] !text-slate-950 font-bold px-7 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base text-center"
            >
              <span>Book With Meals</span>
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
