"use client";

import { NormalizedLibraryGame, userLibraryApi } from "@shared/api";
import { Button, Icon, Skeleton, Textarea, Title } from "@shared/ui";
import { useEffect, useState } from "react";

interface GameNotesProps {
  libraryGame: NormalizedLibraryGame | null;
  username: string;
}

export const GameNotes = ({ libraryGame, username }: GameNotesProps) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(libraryGame?.notes || "");
  const { mutate: addGame, isLoading: isAdding } = userLibraryApi.addGame(
    username,
    () => setEditing(false)
  );

  useEffect(() => {
    setEditedText(libraryGame?.notes || "");
  }, [libraryGame?.notes]);

  if (!libraryGame || !username) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addGame({
      ...libraryGame,
      gameModes: libraryGame.gameModes.join(",") || "",
      genres: libraryGame.genres.join(",") || "",
      themes: libraryGame.themes.join(",") || "",
      notes: editedText,
      updatedAt: new Date(),
    });
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-2 mt-4 lg:mb-3">
        <Title size="small" className="lg:mb-0 mb-0">Your notes</Title>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setEditing((prev) => !prev)}
        >
          <Icon name={editing ? "X" : "Edit"} className="text-white" />
        </Button>
      </div>
      {editing ? (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 ">
          <Textarea
            className="min-h-[160px] resize-none"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={() => setEditing(false)}
              disabled={isAdding}
              type="button"
              variant="destructive"
            >
              Close
            </Button>
            <Button disabled={isAdding} type="submit">
              Save
            </Button>
          </div>
        </form>
      ) : (
        <p className="whitespace-pre-wrap">{libraryGame?.notes}</p>
      )}
    </>
  );
};
