import type { AboutPage } from "@/types";

export const aboutData: AboutPage = {
  _id: "about-page-main",
  slug: "minneriya-safari",
  hero: {
    title: "Discover the Wonder of Minneriya",
    subtitle:
      "Minneriya is where royal history, lush jungles, wildlife corridors, and safari adventures blend into an unforgettable journey.",
    badge: "About Minneriya Safari",
    backgroundImage: "/about-hero.webp",
    highlights: ["UNESCO Heritage", "Wildlife Safaris", "Cultural Immersion", "Luxury Escapes"],
  },
  about: {
    eyebrow: "The Minneriya Legacy",
    title: "Wild Corridors and Ancient Wonder",
    description:
      "Rising from the cultural triangle of Sri Lanka, Minneriya and Sigiriya form an enchanting realm where ancient heritage meets untamed nature. From the legendary 5th-century rock fortress of Sigiriya to the world-renowned Minneriya elephant gathering, our homeland offers an extraordinary tapestry of biodiversity and historical marvels.",
    image: "/sigiriya.webp",
    imageAlt: "Sigiriya rock fortress and water gardens",
    caption: "Walk through water gardens, frescoed caves, and panoramic summit views.",
    highlights: [
      {
        title: "The Great Elephant Gathering",
        text: "Witness the largest seasonal gathering of Asian elephants in the world around Minneriya Reservoir.",
      },
      {
        title: "UNESCO World Heritage",
        text: "Surrounded by ancient kingdoms, UNESCO archaeological marvels, and sacred cultural sites.",
      },
      {
        title: "Lush Jungle & Wildlife",
        text: "Home to leopards, sloth bears, spotted deer, and over 170 species of resident and migratory birds.",
      },
      {
        title: "Authentic Local Hospitality",
        text: "Customized 4x4 jeep safaris, tranquil village catamaran boat rides, and home-cooked organic feasts.",
      },
    ],
  },
  features: {
    eyebrow: "Signature Highlights",
    title: "Crafted journeys in every direction",
    description: "Each experience balances ancient wonder, untamed nature, and refined safari comfort.",
    items: [
      {
        title: "Lion Rock Fortress",
        description: "Climb the legendary staircase to panoramic views and ancient frescoes.",
        icon: "lion",
        image: "/highlight-rock.webp",
        link: "/activities",
      },
      {
        title: "Wildlife Safaris",
        description: "Spot elephants, leopards, and endemic birds in nearby national parks.",
        icon: "wildlife",
        image: "/highlight-safari.webp",
        link: "/activities/safari",
      },
      {
        title: "Village Experiences",
        description: "Meet local artisans, taste traditional cuisine, and cruise serene lakes.",
        icon: "village",
        image: "/highlight-village.webp",
        link: "/activities/village-tour",
      },
      {
        title: "Sunrise & Nature Views",
        description: "Golden light over misty jungles and Sigiriya’s royal gardens.",
        icon: "sunrise",
        image: "/highlight-sunrise.webp",
        link: "/activities",
      },
    ],
  },
  stats: {
    eyebrow: "Why Choose Minneriya Safari",
    title: "Proven Excellence in the Wild",
    description: "Milestones reflecting our dedication to authentic wildlife safaris and ethical nature experiences.",
    items: [
      {
        label: "Elephants at The Gathering",
        value: 500,
        suffix: "+",
        description: "Annual peak wildlife sightings during the dry season.",
        icon: "elephant",
      },
      {
        label: "Happy Global Travelers",
        value: 1200,
        suffix: "+",
        description: "Guests who experienced ethical safaris with local guides.",
        icon: "users",
      },
      {
        label: "Experienced Local Guides",
        value: 10,
        suffix: "+",
        description: "Years of navigating tracks, animal trails, and bird sanctuaries.",
        icon: "award",
      },
      {
        label: "Species of Wild Birds",
        value: 170,
        suffix: "+",
        description: "Spotted across the wetlands, dry forest, and lake edges.",
        icon: "compass",
      },
    ],
  },
  gallery: {
    eyebrow: "Moments in the Wild",
    title: "Captured by Our Travelers",
    description: "Real snapshots from our jeep safaris, village excursions, and sunset viewpoints.",
    items: [
      {
        title: "Gentle Giants of Minneriya",
        image: "/about/i1.webp",
        alt: "Elephants gathering at the reservoir",
      },
      {
        title: "Sunlit Safari Trails",
        image: "/about/i2.webp",
        alt: "Customized 4x4 safari jeep in Minneriya",
      },
      {
        title: "Ancient Rock Majesty",
        image: "/about/i3.webp",
        alt: "Scenic view of Sigiriya fortress",
      },
      {
        title: "Serene Lake Cruise",
        image: "/about/i4.webp",
        alt: "Catamaran boat ride in rural lake",
      },
    ],
  },
  whyVisit: {
    eyebrow: "The Minneriya Experience",
    title: "Reasons Travelers Love Minneriya",
    description: "What makes this wildlife haven the heart of Sri Lanka's cultural and natural heritage.",
    items: [
      {
        title: "World Famous Gathering",
        description:
          "Ranked among the top wildlife spectacles on Earth by Lonely Planet and National Geographic.",
        icon: "wildlife",
      },
      {
        title: "Cultural Triangle Gateway",
        description:
          "Perfect central location to explore Sigiriya, Dambulla Cave Temple, and Polonnaruwa ruins.",
        icon: "culture",
      },
      {
        title: "Ethical & Responsible",
        description:
          "Guaranteed ethical wildlife viewing with respectful distance kept from animal herds at all times.",
        icon: "compass",
      },
    ],
  },
};
