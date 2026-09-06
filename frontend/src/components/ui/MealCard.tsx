import type { Meal } from "@/types";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)] hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
          <span className="text-2xl">
            {meal.icon === "breakfast" && "🍳"}
            {meal.icon === "lunch" && "🍚"}
            {!["breakfast", "lunch"].includes(meal.icon) && "🍽️"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {meal.name}
            </h3>
            {meal.isIncluded && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full">
                Included
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {meal.description}
          </p>
        </div>
      </div>
    </div>
  );
}
