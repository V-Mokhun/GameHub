"use client";

import { GameFilters, MAX_RATING, MIN_RATING } from "@shared/api";
import { useDebouncedValue } from "@shared/lib";
import { Input, Label } from "@shared/ui";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BrowseFilterRatingProps {
  onChange: (
    key: keyof GameFilters,
    value: GameFilters[keyof GameFilters]
  ) => void;
  params: ReadonlyURLSearchParams;
}

export const BrowseFilterRating = ({
  onChange,
  params,
}: BrowseFilterRatingProps) => {
  const [minRating, setMinRating] = useState(
    Number(params.get("ratingMin")) || MIN_RATING
  );
  const [maxRating, setMaxRating] = useState(
    Number(params.get("ratingMax")) || MAX_RATING
  );
  const [debouncedMinRating] = useDebouncedValue(minRating, 1000);
  const [debouncedMaxRating] = useDebouncedValue(maxRating, 1000);

  useEffect(() => {
    if (debouncedMaxRating < debouncedMinRating)
      return setMaxRating(debouncedMinRating);

    onChange("ratingMax", Math.min(debouncedMaxRating, 100));
  }, [debouncedMaxRating, debouncedMinRating]);

  useEffect(() => {
    onChange("ratingMin", Math.max(0, debouncedMinRating));
  }, [debouncedMinRating]);

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
