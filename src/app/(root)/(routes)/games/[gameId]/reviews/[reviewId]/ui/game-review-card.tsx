"use client";
import { GameCard } from "@entities/game";
import { SingleGameReview, userLibraryApi } from "@shared/api";
import { GAMES_ROUTE } from "@shared/consts";
import { Title, buttonVariants } from "@shared/ui";
import { format } from "date-fns";
import Link from "next/link";

interface GameReviewCardProps {
  review: SingleGameReview;
  gameId: string;
  userId?: string;
  username?: string;
}

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
    <div className="flex items-center gap-4">
      <GameCard
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
      <div className="space-y-4">
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
          Learn more about{" "}
          <span className="font-bold ml-1">{review.game.name}</span>
        </Link>
      </div>
    </div>
  );
};
