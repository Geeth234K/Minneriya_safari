import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  backgroundImage: string;
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
  primaryCta,
  secondaryCta,
  highlights,
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`relative w-full flex items-center justify-center overflow-hidden ${
        compact ? "min-h-[50vh] md:min-h-[55vh]" : "min-h-[85vh] md:min-h-screen"
      }`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="gradient-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 section-container text-center text-white px-4 py-20 md:py-24">
        {badge && (
          <span className="inline-block px-4 py-1.5 mb-4 md:mb-6 text-xs md:text-sm font-semibold tracking-wider uppercase bg-white/15 backdrop-blur-sm border border-white/20 rounded-full animate-fade-in">
            {badge}
          </span>
        )}

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto mb-4 md:mb-6 animate-fade-in-up"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed animate-fade-in-up"
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
              <Link href={primaryCta.href} className="btn btn-accent btn-lg w-full sm:w-auto">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn-outline btn-lg w-full sm:w-auto">
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
