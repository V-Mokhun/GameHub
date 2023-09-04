"use client";

import { useUser } from "@clerk/nextjs";
import { userLibraryApi } from "@shared/api";
import { CreateReviewSidebar } from "./create-review-sidebar";
import { CreateReviewForm } from "./create-review-form";

interface CreateReviewProps {
  gameId: string;
  userId: string;
}

export const CreateReview = ({ gameId, userId }: CreateReviewProps) => {
  const { user } = useUser();
  const { data: libraryGame } = userLibraryApi.getLibraryGame(
    gameId,
    user?.id ?? undefined,
    user?.username ?? undefined
  );

  return (
    <div className="flex gap-4">
      <CreateReviewForm
        gameId={gameId}
        userId={userId}
        userRating={libraryGame?.userRating ?? undefined}
      />
      <CreateReviewSidebar
        libraryGame={libraryGame}
        userId={userId}
        username={user?.username ?? undefined}
        gameId={gameId}
      />
    </div>
  );
};
