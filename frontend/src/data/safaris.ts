import type { Safari } from "@/types";

export const safarisData: Safari[] = [
  {
    _id: "safari-jeep-01",
    title: "Jeep Safari Experience",
    description:
      "Venture deep into Minneriya and Kaudulla National Parks in customized 4x4 safari jeeps. Witness the majestic elephant gathering, sloth bears, deer, and exotic birdlife guided by seasoned local wildlife experts.",
    icon: "lion",
    originalPrice: 60,
    discountedPrice: 45,
    discountPercent: 25,
    duration: "Full Day / Half Day",
    groupSize: "Up to 6 people per jeep",
    includes: [
      "Customized 4x4 open-top safari jeep",
      "Experienced local wildlife guide & tracker",
      "Park entrance guidance & animal spotting stops",
      "Comfortable shaded seating & binoculars assistance",
      "Complimentary bottled water",
    ],
    wildlife: ["Elephants", "Leopards", "Spotted Deer", "Peacocks", "Wild Boars", "Endemic Birds"],
    whatToBring: [
      "Camera with zoom lens",
      "Sun protection & hat",
      "Sunglasses",
      "Comfortable lightweight clothing",
      "Binoculars (optional)",
      "Insect repellent",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
