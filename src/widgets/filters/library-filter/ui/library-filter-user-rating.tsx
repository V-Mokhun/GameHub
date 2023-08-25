"use client";

import {
  LibraryGameFilters,
  MAX_USER_RATING,
  MIN_USER_RATING,
} from "@shared/api";
import { useDebouncedValue } from "@shared/lib/hooks";
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
  const [minRating, setMinRating] = useState<number | undefined>(
    minRatingValue
  );
  const [maxRating, setMaxRating] = useState<number | undefined>(
    maxRatingValue
  );
  const [debouncedMinRating] = useDebouncedValue(minRating, 1000);
  const [debouncedMaxRating] = useDebouncedValue(maxRating, 1000);

  useEffect(() => {
    if (!debouncedMaxRating || debouncedMaxRating > MAX_USER_RATING) {
      setMaxRating(MAX_USER_RATING);
      onChange("userRatingMax", MAX_USER_RATING);
      return;
    }
    if (debouncedMinRating === undefined) {
      setMinRating(MIN_USER_RATING);
      onChange("userRatingMin", MIN_USER_RATING);
      return;
    }

    if (debouncedMaxRating < debouncedMinRating)
      return setMaxRating(debouncedMinRating);

    onChange("userRatingMax", Math.min(debouncedMaxRating, MAX_USER_RATING));
  }, [debouncedMaxRating, debouncedMinRating]);

  useEffect(() => {
    if (debouncedMinRating === undefined) {
      setMinRating(MIN_USER_RATING);
      onChange("userRatingMin", 0);
      return;
    }

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
          value={minRating ?? ""}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            if (!e.target.value) return setMinRating(undefined);

            if (
              +e.target.value > (maxRating || MAX_USER_RATING) ||
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
