"use client";

import { MAX_RATING, MIN_RATING } from "@shared/api";
import { useDebouncedValue } from "@shared/lib";
import { Input, Label } from "@shared/ui";
import { useEffect, useState } from "react";

interface BrowseFilterRatingProps {
  onChange: (key: string, value: string) => void;
}

export const BrowseFilterRating = ({ onChange }: BrowseFilterRatingProps) => {
  const [minRating, setMinRating] = useState(MIN_RATING);
  const [maxRating, setMaxRating] = useState(MAX_RATING);
  const [debouncedMinRating] = useDebouncedValue(minRating);
  const [debouncedMaxRating] = useDebouncedValue(maxRating);

  useEffect(() => {
    onChange("ratingMin", debouncedMinRating.toString());
  }, [onChange, debouncedMinRating]);

  useEffect(() => {
    if (debouncedMaxRating < debouncedMinRating)
      setMaxRating(debouncedMinRating);

    onChange(
      "ratingMax",
      Math.max(debouncedMaxRating, debouncedMinRating).toString()
    );
  }, [onChange, debouncedMaxRating, debouncedMinRating]);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">Rating</Label>
      <div className="flex items-center gap-4">
        <Input
          value={minRating}
          onChange={(e) => {
            if (+e.target.value > maxRating || +e.target.value < MIN_RATING)
              return;

            setMinRating(+e.target.value);
          }}
          min={MIN_RATING}
          max={MAX_RATING}
          type="number"
          placeholder="Min"
        />
        <Input
          value={maxRating}
          onChange={(e) => {
            if (+e.target.value > MAX_RATING) return;

            setMaxRating(+e.target.value);
          }}
          min={MIN_RATING}
          max={MAX_RATING}
          type="number"
          placeholder="Max"
        />
      </div>
    </div>
  );
};
