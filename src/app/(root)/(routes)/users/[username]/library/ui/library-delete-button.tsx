"use client";

import { Button } from "@shared/ui";
import { AlertModal } from "@shared/ui/modal";
import { useState } from "react";

interface LibraryDeleteButtonProps {}

export const LibraryDeleteButton = ({}: LibraryDeleteButtonProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <AlertModal
        // isLoading={isDeleting}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={async () => {
          // await deleteGame(gameData.id);
          setIsAlertOpen(false);
        }}
      />
      <div className="flex justify-end px-2">
        <Button variant="destructive" onClick={() => setIsAlertOpen(true)}>
          Delete Library
        </Button>
      </div>
    </>
  );
};
