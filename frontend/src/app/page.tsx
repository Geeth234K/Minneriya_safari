import Link from "next/link";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import SafariCard from "@/components/ui/SafariCard";
import ActivityCard from "@/components/ui/ActivityCard";
import RoomCard from "@/components/ui/RoomCard";
import MealCard from "@/components/ui/MealCard";
import { EmptyState } from "@/components/ui/States";
import { getSafaris } from "@/services/safaris";
import { getActivities } from "@/services/activities";
import { getRooms } from "@/services/rooms";
import { getMeals } from "@/services/meals";
import type { Safari, Activity, Room, Meal } from "@/types";

async function fetchData() {
  const [safaris, activities, rooms, meals] = await Promise.allSettled([
    getSafaris(),
    getActivities(),
    getRooms(),
    getMeals(),
  ]);

  return {
    safaris: safaris.status === "fulfilled" ? safaris.value : ([] as Safari[]),
    activities: activities.status === "fulfilled" ? activities.value : ([] as Activity[]),
    rooms: rooms.status === "fulfilled" ? rooms.value : ([] as Room[]),
    meals: meals.status === "fulfilled" ? meals.value : ([] as Meal[]),
  };
}

export default async function HomePage() {
  const { safaris, activities, rooms, meals } = await fetchData();

  const activeSafaris = safaris.filter((s) => s.isActive);
  const activeMeals = meals.filter((m) => m.isActive);

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title="Discover the Wild Heart of Minneriya"
        subtitle="Unforgettable jeep safaris, authentic village experiences, traditional cuisine, and serene accommodation — all in the heart of Sri Lanka's wildlife paradise."
        badge="Minneriya Safari"
        backgroundImage="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=2000&q=80"
        primaryCta={{ label: "Explore Safari", href: "/safari" }}
        secondaryCta={{ label: "Book Your Stay", href: "/rooms/reserve" }}
        highlights={["Wildlife Safaris", "Village Tours", "Local Cuisine", "Cozy Stays"]}
      />

      {/* ── Introduction ── */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              eyebrow="Welcome to Minneriya"
              title="Your Gateway to Sri Lankan Wildlife"
              description="Nestled near the legendary Minneriya National Park, we offer authentic safari experiences, immersive village tours, traditional home-cooked meals, and peaceful accommodation. Every journey with us is crafted to connect you with the beauty of nature and local culture."
            />
          </div>
        </div>
      </section>

      {/* ── Safari Highlights ── */}
      <section className="section-padding bg-[var(--color-bg-alt)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="Our Experiences"
            title="Safari & Adventures"
            description="Explore the wild landscapes of Minneriya with our curated safari packages."
          />
          {activeSafaris.length > 0 ? (
            <div className="max-w-3xl mx-auto">
              {activeSafaris.map((safari) => (
                <SafariCard key={safari._id} safari={safari} featured />
              ))}
            </div>
          ) : (
            <EmptyState message="Safari packages coming soon." />
          )}
        </div>
      </section>

      {/* ── Activities (Village Tour, Local Food) ── */}
      {activities.length > 0 && (
        <section className="section-padding bg-[var(--color-bg)]">
          <div className="section-container">
            <SectionTitle
              eyebrow="More Experiences"
              title="Village Tours & Local Food"
              description="Go beyond the safari and immerse yourself in authentic Sri Lankan village life and cuisine."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => {
                const slug =
                  activity.title.toLowerCase().includes("village")
                    ? "/village-tour"
                    : activity.title.toLowerCase().includes("food")
                    ? "/local-food"
                    : "/safari";
                return (
                  <ActivityCard
                    key={activity._id}
                    activity={activity}
                    linkTo={slug}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Meals ── */}
      {activeMeals.length > 0 && (
        <section className="section-padding bg-[var(--color-bg-alt)]">
          <div className="section-container">
            <SectionTitle
              eyebrow="Dining"
              title="Home-Cooked Sri Lankan Meals"
              description="Taste the authentic flavors of Sri Lanka with freshly prepared meals made from local ingredients."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {activeMeals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Accommodation ── */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="Stay With Us"
            title="Comfortable Accommodation"
            description="Rest and recharge in our cozy room, surrounded by the serene beauty of Minneriya."
          />
          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            <EmptyState message="Room information coming soon." />
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2000&q=80)",
          }}
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="relative z-10 section-container text-center text-white">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for an Adventure?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6 text-sm sm:text-base">
            Book your Minneriya Safari experience today and discover the
            breathtaking wildlife and culture of Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/rooms/reserve" className="btn btn-accent btn-lg w-full sm:w-auto">
              Reserve Now
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
