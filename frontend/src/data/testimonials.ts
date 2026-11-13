export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  trip: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Emma & James",
    country: "United Kingdom",
    rating: 5,
    text: "Absolutely breathtaking! We saw over 200 elephants at the gathering. Our guide knew exactly where to go and when. The whole experience felt personal and respectful toward the wildlife.",
    trip: "Afternoon Safari",
  },
  {
    id: "t2",
    name: "Marco L.",
    country: "Germany",
    rating: 5,
    text: "Best safari experience in Sri Lanka. The jeep was comfortable, the guide was incredibly knowledgeable, and the homemade rice and curry lunch was delicious. Highly recommend!",
    trip: "Full Day Safari + Lunch",
  },
  {
    id: "t3",
    name: "Sophie & Liam",
    country: "Australia",
    rating: 5,
    text: "We booked the village tour and safari combo. The bullock cart ride was so fun, and seeing wild elephants up close was a dream come true. Our kids loved every moment!",
    trip: "Safari + Village Tour",
  },
  {
    id: "t4",
    name: "Yuki T.",
    country: "Japan",
    rating: 5,
    text: "Very professional and friendly. The room was clean and cozy, breakfast was amazing, and the sunset safari was the highlight of our entire Sri Lanka trip.",
    trip: "Overnight Stay + Safari",
  },
  {
    id: "t5",
    name: "Carlos & Maria",
    country: "Spain",
    rating: 5,
    text: "Incredible value for money. The transfer from Sigiriya was smooth, the safari guide spoke great English, and we got to see elephants, peacocks, and even a crocodile!",
    trip: "Morning Safari",
  },
  {
    id: "t6",
    name: "Anna K.",
    country: "Netherlands",
    rating: 5,
    text: "The treehouse lookout at the lodge was magical. Waking up to birdsong and then heading straight to the park for an early safari — this is how travel should feel.",
    trip: "2-Night Stay + Safaris",
  },
];

