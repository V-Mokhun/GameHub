"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";

interface PaginationLimitProps {
  limit: number;
  limitValues: number[];
  onLimitChange: (limit: number) => void;
  isFetching?: boolean;
}

export const PaginationLimit = ({
  limit,
  limitValues,
  onLimitChange,
  isFetching,
}: PaginationLimitProps) => {
  return (
    <div className="flex items-center gap-2">
      <span>Games per page: </span>
      <Select
        defaultValue={String(limit)}
        onValueChange={(lim) => onLimitChange(Number(lim))}
        disabled={isFetching}
      >
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Games number" />
        </SelectTrigger>
        <SelectContent>
          {limitValues.map((limitValue) => (
            <SelectItem key={limitValue} value={String(limitValue)}>
              {limitValue}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
