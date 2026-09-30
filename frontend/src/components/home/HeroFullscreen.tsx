import Link from "next/link";
import Image from "next/image";

export default function HeroFullscreen() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/safari-hero-elephant.webp"
          alt="Gentle Giants at Minneriya National Park"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] md:object-[center_38%]"
        />
      </div>

      {/* Subtle overlay for text readability without washing out the photo */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top Section: Heading & Subtitle in the Sky */}
      <div className="absolute top-[13%] sm:top-[14%] md:top-[16%] inset-x-0 z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.08em] uppercase leading-[1.18] animate-fade-in-up"
          style={{
            fontFamily: "var(--font-serif-luxury), 'Cormorant Garamond', Georgia, serif",
            color: "#ffffff",
            textShadow: "0 2px 25px rgba(0, 0, 0, 0.7), 0 1px 6px rgba(0, 0, 0, 0.5)",
          }}
        >
          GENTLE GIANTS.
          <br />
          LAKE<span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", verticalAlign: "0.08em", margin: "0 0.04em", fontWeight: 300 }}>-</span>SIDE ENCOUNTERS.
        </h1>

        <p
          className="text-xs sm:text-sm md:text-base font-light tracking-wide max-w-lg mt-3 md:mt-4 leading-relaxed animate-fade-in-up"
          style={{
            color: "rgba(255, 255, 255, 0.95)",
            textShadow: "0 1px 12px rgba(0, 0, 0, 0.7)",
            animationDelay: "0.15s",
          }}
        >
          Experience the unique and intimate bond of elephants in their natural habitat.
        </p>
      </div>

      {/* Center-Lower Section: Explore Our Safaris Pill Button */}
      <div className="absolute bottom-[28%] sm:bottom-[29%] md:bottom-[28%] inset-x-0 z-10 flex justify-center px-4">
        <Link
          href="/activities"
          className="group inline-flex items-center justify-center px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up"
          style={{
            background: "rgba(18, 22, 20, 0.65)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1.5px solid rgba(212, 163, 74, 0.8)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            animationDelay: "0.25s",
          }}
        >
          <span className="transition-colors duration-200 group-hover:text-[var(--color-accent-light)]">
            EXPLORE OUR SAFARIS
          </span>
        </Link>
      </div>
    </section>
  );
}
