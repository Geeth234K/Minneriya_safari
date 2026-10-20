export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://minneriyaecosafari.com/#organization",
    "name": "Minneriya Eco Safari",
    "alternateName": [
      "Minneriya Safari",
      "Minneriya National Park Jeep Safari",
      "Minneriya Safari Tours Sri Lanka",
    ],
    "url": "https://minneriyaecosafari.com",
    "logo": "https://minneriyaecosafari.com/logo-full.webp",
    "image": "https://minneriyaecosafari.com/safari-hero-elephant.webp",
    "description":
      "Official eco-friendly jeep safari tours in Minneriya National Park, Sri Lanka. Experience the legendary elephant gathering, custom 4x4 open-top safaris, authentic village tours, traditional local food, and nature accommodation.",
    "telephone": "+94762838796",
    "email": "sigiriyawhitelodge@gmail.com",
    "priceRange": "$$",
    "currenciesAccepted": "USD, EUR, GBP, LKR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Minneriya National Park Road",
      "addressLocality": "Minneriya",
      "addressRegion": "North Central Province",
      "postalCode": "51400",
      "addressCountry": "LK",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.0333,
      "longitude": 80.8333,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "05:30",
        "closes": "19:00",
      },
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Minneriya",
      },
      {
        "@type": "AdministrativeArea",
        "name": "Sigiriya",
      },
      {
        "@type": "AdministrativeArea",
        "name": "Habarana",
      },
      {
        "@type": "Country",
        "name": "Sri Lanka",
      },
    ],
    "sameAs": [
      "https://wa.me/94762838796",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best time to visit Minneriya National Park for the Elephant Gathering?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The world-famous Minneriya Elephant Gathering peaks during the dry season from July to October, especially in August and September, when up to 300 Asian elephants gather around the Minneriya reservoir. Safaris operate year-round with morning (6:00 AM) and afternoon (2:30 PM) sessions.",
        },
      },
      {
        "@type": "Question",
        "name": "How much does a Minneriya Jeep Safari cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minneriya safari packages typically range between $30 and $70 per person or group package, including a private 4x4 open-top safari jeep, certified wildlife tracker guide, park entrance permits, and complimentary hotel transfers from Sigiriya, Habarana, or Minneriya.",
        },
      },
      {
        "@type": "Question",
        "name": "How long is a Minneriya Safari tour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard half-day safaris last approximately 3 to 4 hours (either morning 6:00 AM – 10:00 AM or afternoon 2:30 PM – 6:30 PM). Full-day combined wildlife experiences are also available upon request.",
        },
      },
      {
        "@type": "Question",
        "name": "Are hotel pickups included with Minneriya Eco Safari?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Minneriya Eco Safari provides direct round-trip door-to-door hotel transfers from accommodations located in Sigiriya, Habarana, Dambulla, and Minneriya.",
        },
      },
      {
        "@type": "Question",
        "name": "What animals can you see in Minneriya National Park?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beyond large herds of Asian elephants, visitors regularly spot Sri Lankan leopards, sloth bears, sambar and spotted deer, toque macaques, mugger crocodiles, water monitors, and over 160 species of resident and migratory birds.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export function SafariTripJsonLd() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Minneriya National Park Elephant Gathering Jeep Safari",
    "image": "https://minneriyaecosafari.com/safari-hero-elephant.webp",
    "description":
      "Private 4x4 open-top jeep safari to witness wild Asian elephants in their natural habitat at Minneriya National Park, Sri Lanka.",
    "brand": {
      "@type": "Brand",
      "name": "Minneriya Eco Safari",
    },
    "offers": {
      "@type": "Offer",
      "url": "https://minneriyaecosafari.com/activities/safari",
      "priceCurrency": "USD",
      "price": "40.00",
      "validFrom": "2026-01-01",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "LK",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 1,
        "returnMethod": "https://schema.org/ReturnInStore",
        "returnFees": "https://schema.org/FreeReturn",
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD",
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "LK",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY",
          },
        },
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184",
      "bestRating": "5",
      "worstRating": "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}
