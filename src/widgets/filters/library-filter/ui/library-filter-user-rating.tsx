"use client";

import {
  LibraryGameFilters,
  MAX_USER_RATING,
  MIN_USER_RATING,
} from "@shared/api";
import { useDebouncedValue } from "@shared/lib";
import { Input, Label } from "@shared/ui";
import { useEffect, useState } from "react";

interface LibraryFilterUserRatingProps {
  onChange: (
    key: keyof LibraryGameFilters,
    value: LibraryGameFilters[keyof LibraryGameFilters]
  ) => void;
  minRatingValue: number;
  maxRatingValue: number;
}

export const LibraryFilterUserRating = ({
  onChange,
  maxRatingValue,
  minRatingValue,
}: LibraryFilterUserRatingProps) => {
  const [minRating, setMinRating] = useState(minRatingValue);
  const [maxRating, setMaxRating] = useState(maxRatingValue);
  const [debouncedMinRating] = useDebouncedValue(minRating, 1000);
  const [debouncedMaxRating] = useDebouncedValue(maxRating, 1000);

  useEffect(() => {
    if (debouncedMaxRating < debouncedMinRating)
      return setMaxRating(debouncedMinRating);

    onChange("userRatingMax", Math.min(debouncedMaxRating, MAX_USER_RATING));
  }, [debouncedMaxRating, debouncedMinRating]);

  useEffect(() => {
    onChange(
      "userRatingMin",
      Math.max(MIN_USER_RATING - 1, debouncedMinRating)
    );
  }, [debouncedMinRating]);

  useEffect(() => {
    setMaxRating(maxRatingValue);
  }, [maxRatingValue]);

  useEffect(() => {
    setMinRating(minRatingValue);
  }, [minRatingValue]);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">User Rating</Label>
      <div className="flex items-center gap-4">
        <Input
          value={minRating}
          onChange={(e) => {
            if (
              +e.target.value > maxRating ||
              +e.target.value < MIN_USER_RATING - 1
            )
              return;

            setMinRating(+e.target.value);
          }}
          min={MIN_USER_RATING - 1}
          max={MAX_USER_RATING}
          type="number"
          placeholder="Min"
        />
        <Input
          value={maxRating}
          onChange={(e) => {
            if (+e.target.value > MAX_USER_RATING) return;

            setMaxRating(+e.target.value);
          }}
          min={MIN_USER_RATING - 1}
          max={MAX_USER_RATING}
          type="number"
          placeholder="Max"
        />
      </div>
    </div>
  );
};
