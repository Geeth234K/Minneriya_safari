/* ───────────────────────── Safari ───────────────────────── */
export interface Safari {
  _id: string;
  title: string;
  description: string;
  icon: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  duration: string;
  groupSize: string;
  includes: string[];
  wildlife: string[];
  whatToBring: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ──────────────────────── Activity ──────────────────────── */
export interface IncludedActivity {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Activity {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  tag: string;
  accentColor: string;
  icon: string;
  heroImage?: string;
  heroImageAlt?: string;
  duration?: string;
  price?: string;
  groupInfo?: string;
  includedActivities: IncludedActivity[];
  createdAt: string;
  updatedAt: string;
}

/* ───────────────────────── Room ─────────────────────────── */
export interface Room {
  _id: string;
  name: string;
  type: string;
  pricePerNight: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/* ──────────────────────── Booking ───────────────────────── */
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type BookingType = "booking" | "itinerary";

export interface Booking {
  _id: string;
  userId: string;
  roomId?: string;
  safariId?: string;
  bookingType: BookingType;
  fullName?: string;
  email?: string;
  whatsapp?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: number;
  interests: string[];
  requests?: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  userId: string;
  roomId?: string;
  safariId?: string;
  bookingType: BookingType;
  fullName: string;
  email: string;
  whatsapp: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  interests?: string[];
  requests?: string;
  totalPrice?: number;
}

/* ────────────────────────── User ────────────────────────── */
export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

/* ────────────────────────── Meal ────────────────────────── */
export interface Meal {
  _id: string;
  name: string;
  description: string;
  icon: string;
  price?: number;
  isIncluded: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ──────────────────────── About Page ────────────────────── */
export interface AboutHighlight {
  title: string;
  text: string;
}

export interface AboutFeature {
  title: string;
  description: string;
  icon: string;
}

export interface AboutStat {
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
}

export interface AboutGalleryItem {
  title: string;
  image: string;
  alt: string;
}

export interface AboutReason {
  title: string;
  description: string;
  icon: string;
}

export interface AboutPage {
  _id: string;
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    badge: string;
    backgroundImage: string;
    highlights: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    caption: string;
    highlights: AboutHighlight[];
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    items: AboutFeature[];
  };
  stats: {
    eyebrow: string;
    title: string;
    description: string;
    items: AboutStat[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    items: AboutGalleryItem[];
  };
  whyVisit: {
    eyebrow: string;
    title: string;
    description: string;
    items: AboutReason[];
  };
}
