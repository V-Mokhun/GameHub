"use client";

import { userLibraryApi } from "@shared/api";
import { Button } from "@shared/ui";
import { AlertModal } from "@shared/ui/modal";
import { useState } from "react";

interface LibraryDeleteButtonProps {
  username: string;
}

export const LibraryDeleteButton = ({ username }: LibraryDeleteButtonProps) => {
  const { mutate: deleteLibrary, isLoading: isDeleting } =
    userLibraryApi.deleteLibrary(username);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <AlertModal
        isLoading={isDeleting}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          deleteLibrary();
          setIsAlertOpen(false);
        }}
      />
      <div className="flex justify-end px-2">
        <Button
          disabled={isDeleting}
          variant="destructive"
          onClick={() => setIsAlertOpen(true)}
        >
          Delete Library
        </Button>
      </div>
    </>
  );
};
