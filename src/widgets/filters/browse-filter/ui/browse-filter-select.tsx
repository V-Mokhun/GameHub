"use client";

import { GameTheme } from "@shared/api";
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
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type BrowseFilterSelectProps<T extends Omit<GameTheme, "slug">> = {
  fetchData: () => Pick<UseQueryResult<T[], unknown>, "data" | "isLoading">;
  title: string;
  onSelect: (value: string) => void;
  onFilterOpen: () => void;
  selectKey: string;
  params: ReadonlyURLSearchParams;
};

export const BrowseFilterSelect = <T extends Omit<GameTheme, "slug">>({
  fetchData,
  onSelect,
  title,
  onFilterOpen,
  selectKey,
  params,
}: BrowseFilterSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<GameTheme[]>([]);
  const { data, isLoading } = fetchData();

  useEffect(() => {
    if (!data || isLoading) return;

    const ids = params.get(selectKey)?.split(",");
    if (!ids) return;

    const selected = data.filter((item) => ids.includes(item.id.toString()));
    setSelectedData(selected);
  }, [data, selectKey, params, isLoading]);

  useEffect(() => {
    if (!data || isLoading) return;

    const ids = params.get(selectKey)?.split(",");

    if (!ids && selectedData.length === 0) return;
    if (
      ids &&
      selectedData.length === ids.length &&
      ids.every((id, index) => id === selectedData[index].id.toString())
    )
      return;

    console.log(selectKey, selectedData);

    onSelect(selectedData.map((item) => item.id).join(","));
  }, [data, isLoading, onSelect, selectedData]);

  if (isLoading)
    return (
      <>
        <Skeleton className="w-36 h-5" />
        <Skeleton className="w-full h-10" />
      </>
    );

  if (!data) return null;

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
        <PopoverContent onClick={onFilterOpen} className="p-0">
          <Command>
            <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    if (
                      selectedData.find(
                        (itm) => itm.name.toLowerCase() === currentValue
                      )
                    ) {
                      setSelectedData((curr) => {
                        const data = curr.filter(
                          (itm) => itm.name.toLowerCase() !== currentValue
                        );
                        return data;
                      });
                    } else {
                      setSelectedData((curr) => {
                        const data = [...curr, item];
                        return data;
                      });
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
