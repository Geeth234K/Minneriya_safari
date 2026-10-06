import { Router } from "express";
import AboutPage from "../models/AboutPage.js";

const router = Router();

const heroImagePath = "/images/about/sigiriya-hero.jpg";
const previousHeroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80";
const aboutImagePath = "/sigiriya.webp";
const previousAboutImage =
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80";
const previousAboutImageAlt = "Sigiriya rock fortress rising above the jungle";
const galleryImagePath = "/images/about/sigiriya-rock-at-dawn.png";
const previousGalleryImage =
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80";
const galleryImageTitle = "Sigiriya Rock at Dawn";
const galleryImageAlt = "Sigiriya rock at dawn";
const galleryImageId = "photo-1472396961693-142e6e269027";
const luxurySafariImagePath = "/images/about/luxury-safari-jeep.png";
const previousLuxurySafariImage =
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=1200&q=80";
const previousLuxurySafariAlt = "Safari jeep on a jungle path";
const luxurySafariImageId = "photo-1499696010180-025ef6e1a8f9";
const luxurySafariTitle = "Luxury Safari Jeeps";
const luxurySafariAlt = "Luxury safari jeep by the lake";
const elephantsImagePath = "/images/about/elephants-in-the-wild.png";
const previousElephantsImage =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80";
const elephantsImageId = "photo-1500534314209-a25ddb2bd429";
const elephantsImageTitle = "Elephants in the Wild";
const elephantsImageAlt = "Elephants grazing";
const jungleCanopyImagePath = "/images/about/jungle-canopy.png";
const previousJungleCanopyImage =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80";
const jungleCanopyImageId = "photo-1441974231531-c6227db76b6e";
const jungleCanopyTitle = "Jungle Canopy";
const jungleCanopyAlt = "Tropical jungle landscape";
const lakesSunsetsImagePath = "/images/about/lakes-sunsets.png";
const previousLakesSunsetsImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
const lakesSunsetsImageId = "photo-1501785888041-af3ef285b470";
const lakesSunsetsTitle = "Lakes & Sunsets";
const lakesSunsetsAlt = "Sunset over a lake";
const sigiriyaPanoramaImagePath = "/images/about/sigiriya-panorama.png";
const sigiriyaPanoramaTitle = "Sigiriya Panorama";
const sigiriyaPanoramaAlt = "Panoramic view from Sigiriya";
const normalizeText = value => (typeof value === "string" ? value.trim().toLowerCase() : "");
const removalKeywords = ["photography", "hiking", "cart riding", "cart ride"];
const shouldRemoveItem = item => {
  const title = normalizeText(item?.title);
  const icon = normalizeText(item?.icon);
  return removalKeywords.some(keyword => title.includes(keyword) || icon === keyword);
};

const defaultAboutData = {
  slug: "sigiriya-safari",
  hero: {
    title: "Discover the Ancient Wonder of Sigiriya",
    subtitle:
      "Sigiriya is a UNESCO World Heritage destination where royal history, lush jungles, wildlife corridors, and safari adventures blend into an unforgettable journey.",
    badge: "Sigiriya Safari",
    backgroundImage: heroImagePath,
    highlights: ["UNESCO Heritage", "Wildlife Safaris", "Cultural Immersion", "Luxury Escapes"]
  },
  about: {
    eyebrow: "The Lion Rock Legacy",
    title: "A citadel carved into the sky",
    description:
      "Rising from the heart of Sri Lanka, Sigiriya is an ancient rock fortress built by King Kashyapa in the 5th century. Its terraced gardens, mirror wall, and sky palace reveal a mastery of art, engineering, and mythology that continues to inspire modern travelers.",
    image: aboutImagePath,
    imageAlt: "Sigiriya rock fortress and water gardens",
    caption: "Walk through water gardens, frescoed caves, and panoramic summit views.",
    highlights: [
      {
        title: "King Kashyapa's Vision",
        text: "The royal citadel blends defensive architecture with poetic artistry, a masterpiece of ancient urban planning."
      },
      {
        title: "UNESCO World Heritage",
        text: "Recognized globally for its cultural impact, archaeology, and extraordinary landscape."
      },
      {
        title: "Jungle & Wildlife",
        text: "Surrounded by tropical forests, Sigiriya is a gateway to elephant corridors and rare birdlife."
      },
      {
        title: "Safari Experiences",
        text: "Luxury jeep safaris, village tours, and eco-lodges offer immersive adventures just beyond the rock."
      }
    ]
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
        link: "/activities"
      },
      {
        title: "Wildlife Safaris",
        description: "Spot elephants, leopards, and endemic birds in nearby national parks.",
        icon: "wildlife",
        image: "/highlight-safari.webp",
        link: "/activities/safari"
      },
      {
        title: "Village Experiences",
        description: "Meet local artisans, taste traditional cuisine, and cruise serene lakes.",
        icon: "village",
        image: "/highlight-village.webp",
        link: "/activities/village-tour"
      },
      {
        title: "Sunrise & Nature Views",
        description: "Golden light over misty jungles and Sigiriya’s royal gardens.",
        icon: "sunrise",
        image: "/highlight-sunrise.webp",
        link: "/activities"
      }
    ]
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
        description: "The largest Asian elephant gathering in the world.",
        icon: "wildlife"
      },
      {
        label: "Years Native Trackers",
        value: 10,
        suffix: "+",
        description: "Expert local guides born and raised around Minneriya.",
        icon: "guide"
      },
      {
        label: "Ethical Safari",
        value: 100,
        suffix: "%",
        description: "Animal welfare, respectful distances, and eco-friendly practices.",
        icon: "ethical"
      },
      {
        label: "Guest Satisfaction",
        value: 4.9,
        suffix: "★",
        description: "Consistently rated 5 stars by safari lovers worldwide.",
        icon: "rating"
      }
    ]
  },
  gallery: {
    eyebrow: "Real Guest Experiences",
    title: "Adventures Shared With Our Guests",
    description: "Real smiles, thrilling wildlife encounters, and lifelong friendships created with travelers from around the world.",
    items: [
      {
        title: "Close Encounter with Gentle Giants",
        image: "/about/i1.webp",
        alt: "Happy couple on safari jeep with elephant in the background"
      },
      {
        title: "Lakeside Sun & Smiles",
        image: "/about/i2.webp",
        alt: "Tourists and guides enjoying the scenic Minneriya lake"
      },
      {
        title: "Sunset Elephant Gathering Group",
        image: "/about/i3.webp",
        alt: "Excited group of travelers on safari jeep with elephant herd at sunset"
      },
      {
        title: "Scenic Sigiriya Valley Viewpoint",
        image: "/about/i4.webp",
        alt: "Couple on safari jeep with Sigiriya rock fortress in the background"
      }
    ]
  },
  whyVisit: {
    eyebrow: "Why Visit",
    title: "Reasons travelers fall in love with Sigiriya",
    description: "An experience designed for culture seekers, wildlife lovers, and luxury explorers.",
    items: [
      {
        title: "Cultural Heritage",
        description: "Walk through palace ruins, gardens, and frescoes that tell royal stories.",
        icon: "culture"
      },
      {
        title: "Wildlife Adventures",
        description: "Enjoy curated safaris with expert guides in nearby national parks.",
        icon: "wildlife"
      },
      {
        title: "Eco-Tourism Experiences",
        description: "Stay in eco-lodges and support conservation-led travel.",
        icon: "eco"
      },
      {
        title: "Family-Friendly Tours",
        description: "Gentle trails, cultural workshops, and safe safari routes for all ages.",
        icon: "family"
      },
      {
        title: "Peaceful Landscapes",
        description: "Slow down with lakeside sunsets, forest trails, and panoramic viewpoints.",
        icon: "landscape"
      }
    ]
  }
};

router.get("/", async (req, res) => {
  try {
    let aboutPage = await AboutPage.findOne({ slug: defaultAboutData.slug });
    if (!aboutPage) {
      aboutPage = await AboutPage.create(defaultAboutData);
    } else {
      let needsSave = false;
      if (
        !aboutPage.hero?.backgroundImage ||
        aboutPage.hero.backgroundImage === previousHeroImage
      ) {
        aboutPage.hero.backgroundImage = heroImagePath;
        needsSave = true;
      }
      const shouldUpdateImage = aboutPage.about?.image !== aboutImagePath;
      const shouldUpdateAlt =
        !aboutPage.about?.imageAlt || aboutPage.about.imageAlt === previousAboutImageAlt;
      if (shouldUpdateImage || shouldUpdateAlt) {
        const currentAbout = aboutPage.about ?? {};
        aboutPage.about = {
          ...defaultAboutData.about,
          ...currentAbout,
          image: aboutImagePath,
          imageAlt: shouldUpdateAlt
            ? "Sigiriya rock fortress and water gardens"
            : currentAbout.imageAlt
        };
        needsSave = true;
      }

      const featureImageMap = {
        lion: { image: "/highlight-rock.webp", link: "/activities" },
        wildlife: { image: "/highlight-safari.webp", link: "/activities/safari" },
        village: { image: "/highlight-village.webp", link: "/activities/village-tour" },
        sunrise: { image: "/highlight-sunrise.webp", link: "/activities" }
      };

      if (aboutPage.features?.items?.length) {
        let featuresUpdated = false;
        aboutPage.features.items = aboutPage.features.items.map(item => {
          const matched = featureImageMap[item.icon];
          if (matched) {
            if (item.image !== matched.image || item.link !== matched.link) {
              item.image = matched.image;
              item.link = matched.link;
              featuresUpdated = true;
            }
          }
          return item;
        });
        if (featuresUpdated) {
          needsSave = true;
        }
      }

      const hasOldStats = aboutPage.stats?.items?.some(
        item => item.label?.includes("UNESCO") || item.label?.includes("Rock Height")
      );
      if (hasOldStats || !aboutPage.stats?.items?.length) {
        aboutPage.stats = defaultAboutData.stats;
        needsSave = true;
      }

      const currentGallery = aboutPage.gallery ?? {};
      if (
        aboutPage.gallery?.title !== defaultAboutData.gallery.title ||
        aboutPage.gallery?.eyebrow !== defaultAboutData.gallery.eyebrow
      ) {
        aboutPage.gallery.eyebrow = defaultAboutData.gallery.eyebrow;
        aboutPage.gallery.title = defaultAboutData.gallery.title;
        aboutPage.gallery.description = defaultAboutData.gallery.description;
        needsSave = true;
      }
      const currentItems = Array.isArray(currentGallery.items) ? currentGallery.items : [];
      const hasGuestImages = currentItems.some(i => i.image?.includes("/about/i"));
      if (
        !hasGuestImages ||
        currentItems.length !== defaultAboutData.gallery.items.length
      ) {
        aboutPage.gallery = defaultAboutData.gallery;
        needsSave = true;
      }
      if (needsSave) {
        await aboutPage.save();
      }
    }
    const currentWhyVisit = aboutPage.whyVisit ?? defaultAboutData.whyVisit;
    const currentWhyItems = Array.isArray(currentWhyVisit.items) ? currentWhyVisit.items : [];
    const filteredWhyItems = currentWhyItems.filter(item => !shouldRemoveItem(item));
    if (filteredWhyItems.length !== currentWhyItems.length || !aboutPage.whyVisit) {
      aboutPage.whyVisit = {
        ...defaultAboutData.whyVisit,
        ...currentWhyVisit,
        items: filteredWhyItems
      };
      await aboutPage.save();
    }
    res.json(aboutPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
