"use client";

import { useUser } from "@clerk/nextjs";
import { userLibraryApi } from "@shared/api";
import { CreateReviewSidebar } from "./create-review-sidebar";
import { ReviewForm } from "@widgets/forms";

interface CreateReviewProps {
  gameId: string;
  userId: string;
}

export const CreateReview = ({ gameId, userId }: CreateReviewProps) => {
  const { user } = useUser();
  const { data: libraryGame, isLoading } = userLibraryApi.getLibraryGame(
    gameId,
    user?.id ?? undefined,
    user?.username ?? undefined
  );

  return (
    <div className="flex gap-4">
      {!isLoading && (
        <ReviewForm
          gameId={gameId}
          userId={userId}
          userRating={libraryGame?.userRating ?? undefined}
        />
      )}
      <CreateReviewSidebar
        libraryGame={libraryGame}
        userId={userId}
        username={user?.username ?? undefined}
        gameId={gameId}
      />
    </div>
  );
};
