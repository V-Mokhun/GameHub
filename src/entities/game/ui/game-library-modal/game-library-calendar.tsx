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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";

const currentYear = new Date().getFullYear();
const years = new Array(40).fill(0).map((_, i) => currentYear - i);

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
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex flex-col xs:flex-row gap-2 items-start xs:items-center justify-between">
      <FormField
        control={control}
        name="finishedAt"
        render={({ field }) => {
          return (
            <FormItem
              className={cn(
                "flex flex-col flex-1 w-full xs:w-auto",
                (watchStatus === GameStatus.PLAYING ||
                  watchStatus === GameStatus.WANT_TO_PLAY) &&
                  "pointer-events-none"
              )}
            >
              <FormLabel>Finished Date</FormLabel>
              <Popover
                open={calendarOpen}
                onOpenChange={(open) => setCalendarOpen(open)}
              >
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
                      <span className="block w-full text-sm">
                        {field.value
                          ? format(field.value, "MMMM do")
                          : "Pick a date"}
                      </span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="buttons"
                    formatters={{
                      formatCaption: (date) => format(date, "MMMM"),
                    }}
                    selected={field.value ?? undefined}
                    fixedWeeks
                    onSelect={(e) => {
                      field.onChange(e || null);
                      if (!e) {
                        setCalendarOpen(false);
                      }
                    }}
                    defaultMonth={field.value ?? new Date()}
                    disabled={(date) =>
                      date > new Date() ||
                      (releaseDate
                        ? date < releaseDate
                        : date < new Date(Date.UTC(1980, 0, 1)))
                    }
                    initialFocus
                    fromYear={
                      field.value ? field.value.getFullYear() : currentYear
                    }
                    toYear={
                      field.value ? field.value.getFullYear() : currentYear
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name="finishedAt"
        render={({ field }) => (
          <FormItem
            className={cn(
              "flex flex-col flex-1 w-full xs:w-auto",
              (watchStatus === GameStatus.PLAYING ||
                watchStatus === GameStatus.WANT_TO_PLAY) &&
                "pointer-events-none"
            )}
          >
            <FormLabel>Finished Year</FormLabel>
            <Select
              disabled={
                watchStatus === GameStatus.PLAYING ||
                watchStatus === GameStatus.WANT_TO_PLAY
              }
              onValueChange={(year) => {
                const value = field.value;
                const date = value
                  ? new Date(value.setFullYear(+year))
                  : new Date(new Date().setFullYear(+year));

                field.onChange(date);
              }}
              defaultValue={
                field.value ? `${field.value.getFullYear()}` : `${currentYear}`
              }
              value={
                field.value ? `${field.value.getFullYear()}` : `${currentYear}`
              }
            >
              <FormControl>
                <SelectTrigger className="bg-background hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground">
                  <SelectValue placeholder="Select a year of finishing the game" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-96">
                {years.map((year) => {
                  if (!releaseDate)
                    return (
                      <SelectItem value={`${year}`} key={year}>
                        {year}
                      </SelectItem>
                    );

                  if (releaseDate.getFullYear() <= year)
                    return (
                      <SelectItem value={`${year}`} key={year}>
                        {year}
                      </SelectItem>
                    );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
