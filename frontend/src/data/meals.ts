import type { Meal } from "@/types";

export const mealsData: Meal[] = [
  {
    _id: "meal-breakfast-01",
    name: "Breakfast",
    description: "Freshly cooked hoppers, coconut sambol, tropical fruits, and Ceylon tea to start the day.",
    icon: "breakfast",
    price: 0,
    isIncluded: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "meal-lunch-02",
    name: "Lunch",
    description: "Hearty traditional rice and curry feast cooked in clay pots with local vegetables and garden spices.",
    icon: "lunch",
    price: 8,
    isIncluded: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
