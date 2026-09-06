import Link from "next/link";
import type { Activity } from "@/types";

interface ActivityCardProps {
  activity: Activity;
  linkTo?: string;
}

export default function ActivityCard({ activity, linkTo }: ActivityCardProps) {
  const Wrapper = linkTo ? Link : "div";
  const wrapperProps = linkTo ? { href: linkTo } : {};

  return (
    <Wrapper
      {...(wrapperProps as React.ComponentProps<typeof Link>)}
      className="group block bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-lg transition-all duration-300"
    >
      {/* Image / themed header */}
      <div
        className="h-44 sm:h-48 relative flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${activity.accentColor}dd, ${activity.accentColor}88)`,
        }}
      >
        <div className="text-center text-white p-4">
          <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">
              {activity.icon === "jeep" && "🚙"}
              {activity.icon === "village" && "🏘️"}
              {activity.icon === "food" && "🍛"}
              {!["jeep", "village", "food"].includes(activity.icon) && "🌿"}
            </span>
          </div>
        </div>

        {/* Tag */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full text-white">
          {activity.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {activity.title}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3 line-clamp-2">
          {activity.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm">
          {activity.duration && (
            <span className="text-[var(--color-text-light)] flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {activity.duration}
            </span>
          )}
          {activity.price && (
            <span className="font-semibold text-[var(--color-primary)]">
              {activity.price}
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
