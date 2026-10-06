import type { Room } from "@/types";

export const roomsData: Room[] = [
  {
    _id: "room-deluxe-chalet-01",
    name: "Deluxe Eco-Safari Chalet",
    type: "Private Chalet & Treehouse",
    pricePerNight: 18,
    description:
      "Authentic private timber chalet featuring air conditioning (A/C), two spacious double beds, attached en-suite bathroom, garden veranda, and an observation treehouse tower just 5 minutes from Minneriya National Park.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
