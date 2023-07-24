"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GameStatus } from "@prisma/client";
import { Game, userLibraryApi } from "@shared/api";
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StarRating,
  Textarea,
} from "@shared/ui";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddGameScheme, addGameScheme } from "../model";
import { LibraryGameData } from "./game-card";
import { cn } from "@shared/lib";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AddGameModalProps {
  gameData: Game;
  isOpen: boolean;
  onClose: () => void;
  libraryGameData?: LibraryGameData;
  userId: string;
}

export const AddGameModal = ({
  gameData,
  isOpen,
  libraryGameData,
  onClose,
  userId,
}: AddGameModalProps) => {
  const [rating, setRating] = useState(libraryGameData?.userRating || 0);
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };
  const { mutate: addGame, isLoading } = userLibraryApi.addGame(
    userId,
    onClose
  );

  const form = useForm<AddGameScheme>({
    defaultValues: {
      finishedAt: libraryGameData?.finishedAt || null,
      notes: libraryGameData?.notes || "",
      playTime: libraryGameData?.playTime || 0,
      status: libraryGameData?.status || GameStatus.WANT_TO_PLAY,
    },
    resolver: zodResolver(addGameScheme),
  });

  const watchStatus = form.watch("status");

  const onSubmit: SubmitHandler<AddGameScheme> = async (data) => {
    await addGame({
      category: gameData.category,
      name: gameData.name,
      id: gameData.id,
      releaseDate: gameData.releaseDate,
      gameModes: gameData.gameModes?.join(",") || "",
      genres: gameData.genres?.join(",") || "",
      themes: gameData.themes?.join(",") || "",
      totalRating: gameData.rating,
      coverUrl: gameData.cover,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      userRating: rating,
      ...data,
      playTime: Number(data.playTime),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <div className="flex gap-2">
          <div className="relative rounded-md overflow-hidden w-28 h-40 md:w-32 md:h-44 shrink-0">
            <Image
              className="object-cover"
              src={gameData.cover}
              fill
              alt={gameData.name}
            />
          </div>
          <div className="flex flex-col">
            <DialogTitle className="text-base md:text-lg mb-1">
              {gameData.name}
            </DialogTitle>
            <span className="text-muted-foreground mb-2">
              ({gameData.releaseDate.getFullYear()})
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-base mb-1">
                Rating{" "}
                {rating > 0 && (
                  <span className="text-muted-foreground ml-1">{rating}</span>
                )}
              </Label>
              <StarRating
                rating={rating}
                onSetRating={(val) => setRating(val)}
              />
            </div>
            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-base">Status</FormLabel>
                    <Select
                      onValueChange={(value: GameStatus) => {
                        field.onChange(value);
                        if (value === GameStatus.PLAYING) {
                          form.setValue("finishedAt", null);
                        } else if (value === GameStatus.WANT_TO_PLAY) {
                          form.setValue("finishedAt", null);
                          form.setValue("playTime", 0);
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
                              .map(
                                (word) => word[0].toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="playTime"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "w-full",
                      watchStatus === GameStatus.WANT_TO_PLAY &&
                        "pointer-events-none"
                    )}
                  >
                    <FormLabel>Play time</FormLabel>
                    <FormControl>
                      <Input
                        disabled={watchStatus === GameStatus.WANT_TO_PLAY}
                        min={0}
                        type="number"
                        placeholder="Hours played"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
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
                              ? format(field.value, "PPP")
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
                          date > new Date() || date < gameData.releaseDate
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your notes here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <Button
                disabled={isLoading || form.formState.isSubmitting}
                onClick={onClose}
                type="button"
                variant="destructive"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading || form.formState.isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
