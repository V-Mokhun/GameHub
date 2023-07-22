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
	useToast,
} from "@shared/ui";

interface BrowseFilterGenresProps {}

export const BrowseFilterGenres = ({}: BrowseFilterGenresProps) => {
  const { toast } = useToast();
  const { data, isError, error, isLoading } = gamesApi.getGenres();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    displayError(toast, error);
    return null;
  }

  console.log(data);

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
