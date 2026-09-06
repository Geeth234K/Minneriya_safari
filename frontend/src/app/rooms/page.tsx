import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import RoomCard from "@/components/ui/RoomCard";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { getRooms } from "@/services/rooms";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rooms & Accommodation",
  description:
    "Stay in comfortable accommodation near Minneriya National Park. Book your room and wake up to the sounds of nature in the heart of Sri Lanka.",
};

export default async function RoomsPage() {
  let rooms;
  try {
    rooms = await getRooms();
  } catch {
    return (
      <div className="pt-20">
        <ErrorState message="Unable to load room information." />
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Stay in the Heart of Nature"
        subtitle="Wake up to the sounds of wildlife and enjoy comfortable accommodation just minutes from Minneriya National Park."
        badge="Accommodation"
        backgroundImage="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80"
        primaryCta={{ label: "Reserve Now", href: "/rooms/reserve" }}
        compact
      />

      {/* Rooms */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="Our Rooms"
            title="Comfortable Accommodation"
            description="Relax in our cozy rooms after a day of adventure. Each stay includes our signature hospitality."
          />

          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            <EmptyState message="Room information is being updated. Please contact us for availability." />
          )}
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding bg-[var(--color-bg-alt)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="What We Offer"
            title="Your Stay Includes"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { emoji: "🍳", label: "Breakfast Included" },
              { emoji: "🌿", label: "Garden View" },
              { emoji: "🚿", label: "Private Bathroom" },
              { emoji: "📶", label: "Free Wi-Fi" },
              { emoji: "🅿️", label: "Free Parking" },
              { emoji: "🛏️", label: "Fresh Linens" },
              { emoji: "🧹", label: "Daily Cleaning" },
              { emoji: "🔑", label: "24/7 Access" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <span className="text-2xl block mb-2">{item.emoji}</span>
                <span className="text-sm font-medium text-[var(--color-text)]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to book */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="section-container">
          <SectionTitle
            eyebrow="How It Works"
            title="Reservation Process"
            description="We use a simple reservation request system to ensure the best experience for our guests."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Submit Request", desc: "Fill out the reservation form with your details." },
              { step: "2", title: "We Review", desc: "Our host checks availability for your dates." },
              { step: "3", title: "Confirmation", desc: "You'll receive confirmation via email or WhatsApp." },
              { step: "4", title: "Enjoy Your Stay", desc: "Arrive and enjoy your Minneriya experience!" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.step}
                </div>
                <h3
                  className="font-bold mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rooms/reserve" className="btn btn-primary btn-lg">
              Submit Reservation Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
