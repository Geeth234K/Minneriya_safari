import Link from "next/link";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-lg transition-shadow duration-300">
      {/* Image area */}
      <div className="h-52 sm:h-56 relative bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/10 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <span className="text-sm font-medium text-[var(--color-text-muted)]">
            {room.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {room.name}
          </h3>
          <span className="shrink-0 px-2.5 py-1 text-xs font-medium bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] rounded-full capitalize">
            {room.type}
          </span>
        </div>

        {room.description && (
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
            {room.description}
          </p>
        )}

        {/* Price + CTA */}
        <div className="flex items-end justify-between flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
          <div>
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              ${room.pricePerNight}
            </span>
            <span className="text-sm text-[var(--color-text-muted)] ml-1">
              / night
            </span>
          </div>
          <Link href="/rooms/reserve" className="btn btn-primary text-sm">
            Reserve Now
          </Link>
        </div>
      </div>
    </article>
  );
}
