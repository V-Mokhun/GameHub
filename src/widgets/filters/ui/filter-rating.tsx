"use client";

import { GameFilters, MAX_RATING, MIN_RATING } from "@shared/api";
import { useDebouncedValue } from "@shared/lib/hooks";
import { Input, Label } from "@shared/ui";
import { useEffect, useState } from "react";

interface FilterRatingProps {
  onChange: (
    key: keyof GameFilters,
    value: GameFilters[keyof GameFilters]
  ) => void;
  minRatingValue: number;
  maxRatingValue: number;
}

export const FilterRating = ({
  onChange,
  maxRatingValue,
  minRatingValue,
}: FilterRatingProps) => {
  const [minRating, setMinRating] = useState<number | undefined>(
    minRatingValue
  );
  const [maxRating, setMaxRating] = useState<number | undefined>(
    maxRatingValue
  );
  const [debouncedMinRating] = useDebouncedValue(minRating, 1000);
  const [debouncedMaxRating] = useDebouncedValue(maxRating, 1000);

  useEffect(() => {
    if (!debouncedMaxRating || debouncedMaxRating > MAX_RATING) {
      setMaxRating(MAX_RATING);
      onChange("ratingMax", MAX_RATING);
      return;
    }
    if (debouncedMinRating === undefined) {
      setMinRating(MIN_RATING);
      onChange("ratingMin", MIN_RATING);
      return;
    }

    if (debouncedMaxRating < debouncedMinRating)
      return setMaxRating(debouncedMinRating);

    onChange("ratingMax", Math.min(debouncedMaxRating, MAX_RATING));
  }, [debouncedMaxRating, debouncedMinRating]);

  useEffect(() => {
    if (debouncedMinRating === undefined) {
      setMinRating(MIN_RATING);
      onChange("ratingMin", 0);
      return;
    }

    onChange("ratingMin", Math.max(0, debouncedMinRating));
  }, [debouncedMinRating]);

  useEffect(() => {
    setMaxRating(maxRatingValue);
  }, [maxRatingValue]);

  useEffect(() => {
    setMinRating(minRatingValue);
  }, [minRatingValue]);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">Rating</Label>
      <div className="flex items-center gap-4">
        <Input
          value={minRating ?? ""}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            if (!e.target.value) return setMinRating(undefined);

            if (
              +e.target.value > (maxRating || MAX_RATING) ||
              !e.target.value.match(/^\d+$/)
            )
              return;

            setMinRating(+e.target.value);
          }}
          type="text"
          placeholder="Min"
        />
        <Input
          value={maxRating ?? ""}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            if (!e.target.value) return setMaxRating(undefined);

            if (!e.target.value.match(/^\d+$/)) return;

            setMaxRating(+e.target.value);
          }}
          type="text"
          placeholder="Max"
        />
      </div>
    </div>
  );
};
