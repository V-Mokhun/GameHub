"use client";

import { gamesApi } from "@shared/api";
import { CREATE_REVIEW_ROUTE, GAMES_ROUTE } from "@shared/consts";
import { Link, Title, buttonVariants } from "@shared/ui";
import { format } from "date-fns";
import Image from "next/image";
import NextLink from "next/link";

interface ReviewsGameProps {
  gameId: string;
}

export const ReviewsGame = ({ gameId }: ReviewsGameProps) => {
  const { data: game } = gamesApi.getGame(gameId);

  if (!game) return null;

  return (
    <div className="flex gap-4 mb-4">
      {game.cover && (
        <NextLink
          className="relative rounded-md overflow-hidden w-28 h-40 md:w-32 md:h-44 lg:w-40 lg:h-52 xl:w-48 xl:h-60 shrink-0"
          href={`${GAMES_ROUTE}/${game.id}`}
        >
          <Image fill src={game.cover} alt={game.name} />
        </NextLink>
      )}
      <div>
        <div className="flex gap-2 mb-3 items-center">
          <Title className="mb-0 lg:mb-0">
            <Link href={`${GAMES_ROUTE}/${game.id}`}>{game.name}</Link>
          </Title>
          {game.releaseDate && (
            <span className="text-muted-foreground text-lg lg:text-xl">
              ( {format(new Date(game.releaseDate), "yyyy")} )
            </span>
          )}
        </div>
        <Title className="lg:mb-6 mb-4" size="large">
          User Reviews
        </Title>
        <NextLink
          href={CREATE_REVIEW_ROUTE(gameId)}
          className={buttonVariants({ variant: "secondary" })}
        >
          Write a Review
        </NextLink>
      </div>
    </div>
  );
};
