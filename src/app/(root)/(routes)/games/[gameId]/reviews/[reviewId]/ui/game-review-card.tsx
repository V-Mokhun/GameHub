"use client";
import { GameCard, GameCardSkeleton } from "@entities/game";
import { SingleGameReview, userLibraryApi } from "@shared/api";
import { GAMES_ROUTE } from "@shared/consts";
import { Skeleton, Title, buttonVariants } from "@shared/ui";
import { format } from "date-fns";
import Link from "next/link";

interface GameReviewCardProps {
  review: SingleGameReview;
  gameId: string;
  userId?: string;
  username?: string;
}

export const GameReviewCardSkeleton = () => (
  <div className="flex flex-col md:flex-row md:items-center gap-4">
    <GameCardSkeleton className="flex-none w-1/2 sm:w-1/3 md:w-auto" />
    <div className="space-y-2 md:space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="space-y-1">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

export const GameReviewCard = ({
  review,
  gameId,
  userId,
  username,
}: GameReviewCardProps) => {
  const { data: libraryGame } = userLibraryApi.getLibraryGame(
    gameId,
    userId,
    username
  );

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <GameCard
        classNames={{
          card: "w-1/2 sm:w-1/3 md:w-auto",
        }}
        game={{
          category: review.game.category,
          id: review.game.id,
          name: review.game.name,
          cover: review.game.coverUrl || "",
          rating: review.game.totalRating,
          themes: review.game.themes,
          gameModes: review.game.gameModes,
          genres: review.game.genres,
          releaseDate: review.game.releaseDate
            ? new Date(review.game.releaseDate)
            : undefined,
        }}
        libraryGameData={libraryGame ?? undefined}
        isInLibrary={!!libraryGame}
        userId={userId}
        username={username ?? undefined}
      />
      <div className="space-y-2 md:space-y-4">
        <Title>{review.game.name}</Title>
        {review.game.releaseDate && (
          <p>
            <span className="block font-bold">Release Date:</span>
            <span>
              {format(new Date(review.game.releaseDate), "MMM do, y")}
            </span>
          </p>
        )}
        <Link
          className={buttonVariants()}
          href={`${GAMES_ROUTE}/${review.game.id}`}
        >
          Learn more{" "}
          <span className="sm:inline hidden ml-1">
            {" "}
            about <span className="font-bold">{review.game.name}</span>
          </span>
        </Link>
      </div>
    </div>
  );
};
