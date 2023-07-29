"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GameStatus } from "@prisma/client";
import { Game, userLibraryApi } from "@shared/api";
import { cn } from "@shared/lib";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  StarRating,
  Textarea,
} from "@shared/ui";
import { AlertModal } from "@shared/ui/modal";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddGameScheme, addGameScheme } from "../../model";
import { LibraryGameData } from "../game-card";
import { GameLibraryCalendar } from "./game-library-calendar";
import { GameLibraryStatus } from "./game-library-status";

interface GameLibraryModalProps {
  gameData: Game;
  isOpen: boolean;
  onClose: () => void;
  libraryGameData?: LibraryGameData;
  userId: string;
  username: string;
  isInLibrary?: boolean;
}

export const GameLibraryModal = ({
  gameData,
  isOpen,
  libraryGameData,
  onClose,
  userId,
  username,
  isInLibrary,
}: GameLibraryModalProps) => {
  const [rating, setRating] = useState(libraryGameData?.userRating || 0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  const { mutate: addGame, isLoading: isAdding } = userLibraryApi.addGame(
    username,
    onClose
  );
  const { mutate: deleteGame, isLoading: isDeleting } =
    userLibraryApi.removeGame(username, onClose);

  const isLoading = isAdding || isDeleting;

  const form = useForm<AddGameScheme>({
    defaultValues: {
      finishedAt: libraryGameData?.finishedAt
        ? new Date(libraryGameData.finishedAt)
        : null,
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
      releaseDate: gameData.releaseDate || null,
      gameModes: gameData.gameModes?.join(",") || "",
      genres: gameData.genres?.join(",") || "",
      themes: gameData.themes?.join(",") || "",
      totalRating: gameData.rating,
      coverUrl: gameData.cover,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      userRating: rating === 0 ? null : rating,
      ...data,
      playTime: Number(data.playTime),
    });
  };

  return (
    <>
      <AlertModal
        isLoading={isDeleting}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={async () => {
          await deleteGame(gameData.id);
          setIsAlertOpen(false);
        }}
      />
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <div className="flex gap-2">
            <div className="relative rounded-md overflow-hidden w-28 h-40 md:w-32 md:h-44 shrink-0">
              <Image
                className="object-cover"
                src={gameData.cover}
                fill
                sizes="(min-width: 768px) 128px, 112px"
                alt={gameData.name}
              />
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-base md:text-lg mb-1">
                {gameData.name}
              </DialogTitle>
              {gameData.releaseDate && (
                <span className="text-muted-foreground mb-2">
                  {gameData.releaseDate.getFullYear()}
                </span>
              )}
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
                <GameLibraryStatus
                  control={form.control}
                  setValue={form.setValue}
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
              <GameLibraryCalendar
                control={form.control}
                releaseDate={gameData.releaseDate}
                watchStatus={watchStatus}
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
                  onClick={isInLibrary ? () => setIsAlertOpen(true) : onClose}
                  type="button"
                  variant="destructive"
                >
                  {isInLibrary ? "Delete" : "Cancel"}
                </Button>
                <Button
                  disabled={isLoading || form.formState.isSubmitting}
                  type="submit"
                >
                  {isInLibrary ? "Edit" : "Add"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
