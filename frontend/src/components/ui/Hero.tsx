import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  backgroundImage: string;
  backgroundPosition?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  highlights?: string[];
  compact?: boolean;
}

export default function Hero({
  title,
  subtitle,
  badge,
  backgroundImage,
  backgroundPosition = "center",
  primaryCta,
  secondaryCta,
  highlights,
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`relative w-full flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 ${
        compact ? "min-h-[460px] sm:min-h-[500px] md:min-h-[55vh]" : "min-h-[85vh] md:min-h-screen"
      }`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition,
        }}
      />
      <div className="gradient-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 section-container text-center text-white px-4 py-4 sm:py-8 md:py-12">
        {badge && (
          <span className="inline-block px-3.5 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 md:mb-6 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase bg-white/15 backdrop-blur-sm border border-white/20 rounded-full animate-fade-in shadow-sm">
            {badge}
          </span>
        )}

        <h1
          className="!text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-6 animate-fade-in-up drop-shadow-md"
          style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
        >
          {title}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 leading-relaxed animate-fade-in-up font-light"
          style={{ animationDelay: "0.1s" }}
        >
          {subtitle}
        </p>

        {/* CTA buttons */}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {primaryCta && (
              <Link href={primaryCta.href} className="btn btn-accent btn-md sm:btn-lg w-full sm:w-auto text-sm sm:text-base">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn-outline btn-md sm:btn-lg w-full sm:w-auto text-sm sm:text-base">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}

        {/* Highlight badges */}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 md:mt-10 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {highlights.map((h) => (
              <span
                key={h}
                className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/90"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
