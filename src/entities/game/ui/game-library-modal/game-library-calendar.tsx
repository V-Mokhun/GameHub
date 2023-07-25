import { AddGameScheme } from "@entities/game";
import { GameStatus } from "@prisma/client";
import { cn } from "@shared/lib";
import {
  Button,
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";

interface GameLibraryCalendarProps {
  control: Control<AddGameScheme>;
  watchStatus: GameStatus;
  releaseDate?: Date;
}

export const GameLibraryCalendar = ({
  control,
  releaseDate,
  watchStatus,
}: GameLibraryCalendarProps) => {
  return (
    <FormField
      control={control}
      name="finishedAt"
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-col",
            (watchStatus === GameStatus.PLAYING ||
              watchStatus === GameStatus.WANT_TO_PLAY) &&
              "pointer-events-none"
          )}
        >
          <FormLabel>Finished Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={
                    watchStatus === GameStatus.PLAYING ||
                    watchStatus === GameStatus.WANT_TO_PLAY
                  }
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal space-x-2 text-sm md:text-base",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span className="block w-full">
                    {field.value
                      ? format(new Date(field.value), "PPP")
                      : "Pick a date of finishing the game"}
                  </span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={field.value ?? undefined}
                onSelect={(e) => field.onChange(e || null)}
                disabled={(date) =>
                  date > new Date() ||
                  (releaseDate
                    ? date < releaseDate
                    : date < new Date(Date.UTC(1900, 0, 1)))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
