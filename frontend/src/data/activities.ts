import type { Activity } from "@/types";

export const activitiesData: Activity[] = [
  {
    _id: "activity-safari-01",
    title: "Jeep Safari",
    shortDescription: "Thrilling wildlife safari through scenic trails in Minneriya.",
    description:
      "Embark on an unforgettable jeep safari across Minneriya and Kaudulla National Parks. Witness the world-famous Elephant Gathering, spot leopards, deer, and exotic birds while an experienced guide navigates scenic trails.",
    tag: "Adventure",
    accentColor: "#1c7c54",
    icon: "jeep",
    heroImage: "/about/i3.webp",
    heroImageAlt: "4x4 Jeep Safari in Minneriya",
    duration: "Full Day / Half Day",
    price: "$45 per person",
    groupInfo: "Up to 6 guests per private jeep",
    includedActivities: [
      {
        title: "Elephant Corridors",
        description: "Travel through famous trails where wild elephants gather around the tank.",
        image: "/about/i1.webp",
        imageAlt: "Wild elephants grazing",
      },
      {
        title: "Panoramic Sunset Stop",
        description: "Experience golden hour views across the Minneriya reservoir water edge.",
        image: "/about/i2.webp",
        imageAlt: "Safari sunset over Minneriya",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "activity-village-02",
    title: "Village Tours",
    shortDescription:
      "A cultural immersion combining catamaran boat ride, bullock cart, and rural hospitality.",
    description:
      "Spend a peaceful day discovering authentic rural life around Sigiriya and Minneriya. Cruise across tranquil lotus lakes on a traditional catamaran, ride a rustic cart through village paths, and enjoy genuine village hospitality.",
    tag: "Culture",
    accentColor: "#8b5cf6",
    icon: "village",
    heroImage: "/images/activities/village-tour-hero.png",
    heroImageAlt: "Traditional catamaran boat on Sigiriya lake",
    duration: "Half Day (3-4 Hours)",
    price: "$8 per group",
    groupInfo: "Private group bookings available for families and friends.",
    includedActivities: [
      {
        title: "Catamaran Boat Ride",
        description: "Glide across serene lotus-covered waters surrounded by lush jungle vistas.",
        image: "/images/activities/boat-ride.png",
        imageAlt: "Boat ride on serene village lake",
      },
      {
        title: "Bullock Cart Ride",
        description: "Ride through shady village trails on a traditional cart.",
        image: "/images/activities/cart-ride.png",
        imageAlt: "Cart ride through village trail",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "activity-food-03",
    title: "Local Food",
    shortDescription: "Taste authentic traditional Sri Lankan cuisine in clay pots.",
    description:
      "Savor freshly prepared organic rice and curry, fresh seasonal lake fish, vegetables straight from the village farm, and sweet local treats prepared according to age-old village recipes.",
    tag: "Cuisine",
    accentColor: "#f59e0b",
    icon: "food",
    heroImage: "/images/localfood.webp",
    heroImageAlt: "Traditional Sri Lankan lunch served in clay pots",
    duration: "Lunch / Dinner",
    price: "$8 per person",
    groupInfo: "Freshly prepared for individuals, couples, and groups.",
    includedActivities: [
      {
        title: "Clay Pot Cooking",
        description: "Cooked with coconut milk and aromatic island spices over firewood stoves.",
        image: "/images/localfood.webp",
        imageAlt: "Authentic local clay pot feast",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
