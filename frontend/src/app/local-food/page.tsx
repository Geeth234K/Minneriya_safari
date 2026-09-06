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
        backgroundImage="https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=2000&q=80"
        primaryCta={{ label: "Book Experience", href: "/rooms/reserve" }}
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

      {/* CTA */}
      <section className="section-padding bg-[var(--color-primary-dark)] text-white text-center">
        <div className="section-container">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Taste the Real Sri Lanka
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm sm:text-base">
            Include local meals in your safari experience for an authentic culinary journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/rooms/reserve" className="btn btn-accent btn-lg w-full sm:w-auto">
              Book With Meals
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
