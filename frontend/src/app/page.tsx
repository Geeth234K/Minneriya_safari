import Link from "next/link";
import HeroFullscreen from "@/components/home/HeroFullscreen";
import SectionTitle from "@/components/ui/SectionTitle";
import ActivitiesBentoGrid from "@/components/home/ActivitiesBentoGrid";
import WhySafariWithUs from "@/components/home/WhySafariWithUs";
import { getSafaris } from "@/services/safaris";
import { getActivities } from "@/services/activities";
import type { Safari, Activity } from "@/types";

async function fetchData() {
  const [safaris, activities] = await Promise.allSettled([
    getSafaris(),
    getActivities(),
  ]);

  return {
    safaris: safaris.status === "fulfilled" ? safaris.value : ([] as Safari[]),
    activities: activities.status === "fulfilled" ? activities.value : ([] as Activity[]),
  };
}

export default async function HomePage() {
  const { safaris, activities } = await fetchData();

  return (
    <>
      {/* ── Hero Fullscreen ── */}
      <HeroFullscreen />

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

      {/* ── Our Experiences (Modern Bento Grid with Videos & Imagery) ── */}
      <ActivitiesBentoGrid activities={activities} safaris={safaris} />

      {/* ── The Minneriya Difference: Why Safari With Us & Real Wild Moments ── */}
      <WhySafariWithUs />

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
