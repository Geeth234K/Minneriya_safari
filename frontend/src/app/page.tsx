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

      {/* ── CTA Section (Featuring User's Elephant Gathering with Full Visibility) ── */}
      <section className="relative min-h-[460px] md:min-h-[520px] py-20 md:py-28 flex items-center justify-center overflow-hidden">
        {/* Background Image: 16:9 Elephant Gathering */}
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url('/CTA.webp')",
            backgroundPosition: "center 42%",
          }}
        />

        {/* Cinematic Vignette Overlay: Light in the middle so the elephants stay visible, darker top and bottom */}
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
            Book your Minneriya Safari experience today and discover the
            breathtaking wildlife, legendary elephant gatherings, and authentic culture of Sri Lanka.
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
