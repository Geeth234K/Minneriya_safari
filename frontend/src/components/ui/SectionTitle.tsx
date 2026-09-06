interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-8 md:mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span
          className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-2"
          style={{ color: light ? "var(--color-accent-light)" : "var(--color-accent-dark)" }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${
          light ? "text-white" : "text-[var(--color-text)]"
        }`}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-[var(--color-text-muted)]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
