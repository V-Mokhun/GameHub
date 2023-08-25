import { AddGameScheme } from "@entities/game";
import { GameStatus } from "@prisma/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { Control, UseFormSetValue } from "react-hook-form";

interface GameLibraryStatusProps {
  control: Control<AddGameScheme>;
  setValue: UseFormSetValue<AddGameScheme>;
  setRating: (value: number) => void;
}

export const GameLibraryStatus = ({
  control,
  setValue,
  setRating
}: GameLibraryStatusProps) => {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-base">Status</FormLabel>
          <Select
            onValueChange={(value: GameStatus) => {
              field.onChange(value);
              if (value === GameStatus.PLAYING) {
                setValue("finishedAt", null);
              } else if (value === GameStatus.WANT_TO_PLAY) {
                setValue("finishedAt", null);
                setValue("playTime", 0);
                setRating(0)
              }
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Game Status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(GameStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status
                    .toLowerCase()
                    .split("_")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
