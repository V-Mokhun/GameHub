"use client";

import { GameGenre, gamesApi } from "@shared/api";
import { cn } from "@shared/lib";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@shared/ui";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";

interface BrowseFilterGenresProps {}

export const BrowseFilterGenres = ({}: BrowseFilterGenresProps) => {
  const { data: genres, isLoading } = gamesApi.getGenres();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<GameGenre[]>([]);
  const [searchedGenre, setSearchedGenre] = useState("");

  if (isLoading)
    return (
      <>
        <Skeleton className="w-36 h-5" />
        <Skeleton className="w-full h-10" />
      </>
    );

  if (!genres) return null;

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">Genres</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={isOpen}>
            {selectedGenres.length > 0
              ? selectedGenres.map((genre) => genre.name).join(", ")
              : "No genre selected"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search genre..." />
            <CommandEmpty>No genre found.</CommandEmpty>
            <CommandGroup>
              {genres
                // .filter((genre) =>
                //   genre.name
                //     .toLowerCase()
                //     .includes(searchedGenre.trim().toLowerCase())
                // )
                .map((genre) => (
                  <CommandItem
                    key={genre.id}
                    value={genre.name}
                    onSelect={(currentValue) => {
                      if (
                        selectedGenres.find((gen) => gen.name === currentValue)
                      ) {
                        setSelectedGenres((curr) =>
                          curr.filter((gen) => gen.name !== currentValue)
                        );
                      } else {
                        setSelectedGenres((curr) => [...curr, genre]);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedGenres.find((gen) => gen.id === genre.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {genre.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
