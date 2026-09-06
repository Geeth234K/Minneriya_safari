import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import ReservationForm from "@/components/forms/ReservationForm";
import { ErrorState } from "@/components/ui/States";
import { getRooms } from "@/services/rooms";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reserve a Room",
  description:
    "Submit a reservation request for accommodation near Minneriya National Park. Our host will confirm availability and contact you.",
};

export default async function ReservePage() {
  let rooms;
  try {
    rooms = await getRooms();
  } catch {
    return (
      <div className="pt-24">
        <ErrorState message="Unable to load rooms. Please try again later." />
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-12 md:pb-16 bg-[var(--color-bg)]">
      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-[var(--color-text-muted)]" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/rooms" className="hover:text-[var(--color-primary)] transition-colors">
                Rooms
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-text)]">Reserve</li>
          </ol>
        </nav>

        <div className="max-w-2xl mx-auto">
          <SectionTitle
            eyebrow="Reservation Request"
            title="Reserve Your Stay"
            description="Fill out the form below to submit a reservation request. Our host will check availability and confirm your booking."
          />

          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 sm:p-8 shadow-sm">
            <ReservationForm rooms={rooms} />
          </div>
        </div>
      </div>
    </div>
  );
}
