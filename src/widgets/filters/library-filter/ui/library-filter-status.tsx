"use client";

import { GameStatus } from "@prisma/client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface LibraryFilterStatusProps {
  defaultValue: GameStatus | undefined;
  onStatusSelect: (value: GameStatus | undefined) => void;
  onClick: () => void;
}

const transformStatus = (status: GameStatus) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export const LibraryFilterStatus = ({
  defaultValue,
  onStatusSelect,
  onClick,
}: LibraryFilterStatusProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(
    defaultValue ? transformStatus(defaultValue) : ""
  );

  useEffect(() => {
    setValue(defaultValue ? transformStatus(defaultValue) : "");
  }, [defaultValue]);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base">Game Status</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={isOpen}>
            {value
              ? value
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")
              : "All"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent onClick={onClick} className="p-0">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {Object.values(GameStatus).map((status) => {
                const readableStatus = transformStatus(status);

                return (
                  <CommandItem
                    key={status}
                    onSelect={(currentValue) => {
                      setValue((val) => {
                        const data =
                          currentValue === val.toLowerCase()
                            ? ""
                            : (currentValue as GameStatus);

                        const transformedData = data
                          ? (data
                              .toUpperCase()
                              .split(" ")
                              .join("_") as GameStatus)
                          : undefined;

                        onStatusSelect(transformedData);

                        return data;
                      });
                      setIsOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === readableStatus ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {readableStatus}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
