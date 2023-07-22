"use client";

import { gamesApi } from "@shared/api";
import { displayError } from "@shared/lib";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  useToast,
} from "@shared/ui";

interface BrowseFilterGenresProps {}

export const BrowseFilterGenres = ({}: BrowseFilterGenresProps) => {
  const { data, isLoading } = gamesApi.getGenres();

  if (isLoading)
    return (
      <>
        <Skeleton className="w-36 h-5" />
        <Skeleton className="w-full h-10" />
      </>
    );

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">Genres</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
