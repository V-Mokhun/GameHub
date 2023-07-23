"use client";

import { Game } from "@shared/api";
import { LibraryGameData } from "./game-card";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
  Link,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StarRating,
  Textarea,
} from "@shared/ui";
import { title } from "process";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddGameScheme, addGameScheme } from "../model";
import { GameStatus } from "@prisma/client";

interface AddGameModalProps {
  gameData: Pick<Game, "id" | "name" | "releaseDate" | "rating" | "cover">;
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

  const form = useForm<AddGameScheme>({
    defaultValues: {
      finishedDate: libraryGameData?.finishedAt,
      notes: libraryGameData?.notes || "",
      playTime: libraryGameData?.playTime ?? undefined,
      status: libraryGameData?.status || GameStatus.WANT_TO_PLAY,
    },
    resolver: zodResolver(addGameScheme),
  });

  const onSubmit: SubmitHandler<AddGameScheme> = async (data) => {};

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
                      onValueChange={(value: GameStatus) =>
                        field.onChange(value)
                      }
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
                render={({ field: { value, ...field } }) => (
                  <FormItem className="w-full">
                    <FormLabel>Play time</FormLabel>
                    <FormControl>
                      <Input
                        min={0}
                        value={value ?? undefined}
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
              <Button onClick={onClose} type="button" variant="destructive">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
