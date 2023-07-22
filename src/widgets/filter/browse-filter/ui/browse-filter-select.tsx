"use client";

import { GameTheme, gamesApi } from "@shared/api";
import { cn } from "@shared/lib";
import {
  Button,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@shared/ui";
import { UseQueryResult } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface PropsWithFetch<T extends Omit<GameTheme, "slug">> {
  fetchData: () => UseQueryResult<T[], unknown>;
  title: string;
}

interface PropsWithStatic<T extends Omit<GameTheme, "slug">> {
  data: T[];
  title: string;
}

type BrowseFilterSelectProps<T extends Omit<GameTheme, "slug">> =
  | PropsWithFetch<T>
  | PropsWithStatic<T>;

export const BrowseFilterSelect = <T extends Omit<GameTheme, "slug">>(
  props: BrowseFilterSelectProps<T>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<GameTheme[]>([]);
  const { title } = props;
  let data: T[];

  if ("fetchData" in props) {
    const { data: resp, isLoading } = props.fetchData();

    if (isLoading)
      return (
        <>
          <Skeleton className="w-36 h-5" />
          <Skeleton className="w-full h-10" />
        </>
      );

    if (!resp) return null;

    data = resp;
  } else {
    data = props.data;
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">{title}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={isOpen}>
            {selectedData.length > 0
              ? selectedData.map((item) => item.name).join(", ")
              : `No ${title.toLowerCase()} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command className="">
            <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    if (selectedData.find((itm) => itm.name === currentValue)) {
                      setSelectedData((curr) =>
                        curr.filter((itm) => itm.name !== currentValue)
                      );
                    } else {
                      setSelectedData((curr) => [...curr, item]);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedData.find((itm) => itm.id === item.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
