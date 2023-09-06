"use client";

import { cn } from "@shared/lib";
import { useState } from "react";
import { StarIcon } from "./star-icon";

interface StarRatingProps {
  rating: number;
  onSetRating: (rating: number) => void;
  disabled?: boolean;
}

export const StarRating = ({
  rating,
  onSetRating,
  disabled,
}: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex items-center">
      {[...Array(10)].map((_, i) => {
        return (
          <button
            disabled={disabled}
            key={i + 1}
            onClick={() => onSetRating(i + 1)}
            type="button"
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(null)}
            className="px-0.5"
          >
            <StarIcon
              className={cn(
                i + 1 <= (hover || rating)
                  ? "text-secondary"
                  : "text-muted-foreground",
                disabled && "opacity-50"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
