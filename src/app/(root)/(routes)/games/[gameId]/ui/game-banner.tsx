import { GameCard } from "@entities/game";
import { FullGame, NormalizedLibraryGame } from "@shared/api";
import { Container, Skeleton, Title } from "@shared/ui";
import Image from "next/image";
import { useMemo, useState } from "react";

interface GameBannerProps {
  game?: FullGame;
  isLoading: boolean;
  userId?: string | null;
  libraryGame?: NormalizedLibraryGame | null;
  username?: string | null;
}

export const GameBanner = ({
  game,
  isLoading,
  userId,
  libraryGame,
  username,
}: GameBannerProps) => {
  const randomArtwork = useMemo(
    () => game?.artworks[Math.floor(Math.random() * game.artworks.length)],
    []
  );

  if (isLoading)
    return (
      <>
        <div className="relative -mt-6 mb-2 h-[max(40vh,200px)] md:h-[max(50vh,300px)] w-full md:-mt-5">
          <Skeleton className="absolute inset-x-0 top-0 z-0 h-full overflow-hidden" />
        </div>
      </>
    );

  return (
    game && (
      <>
        <div className="relative -mt-6 mb-2 h-[max(40vh,200px)] md:h-[max(50vh,300px)] w-full md:-mt-5">
          <div className="absolute inset-x-0 top-0 z-0 h-full overflow-hidden">
            <Image
              className="w-full h-full object-cover blur-sm"
              fill
              alt={game.name}
              src={randomArtwork || game.cover || ""}
              priority={true}
              sizes="100vw"
            />

            <div className="absolute top-6 left-4 h-3/4 w-1/2 sm:w-1/3 lg:w-1/4">
              <GameCard
                key={game.id}
                game={{
                  category: game.category,
                  id: game.id,
                  name: game.name,
                  cover: game.cover || "",
                  rating: game.rating,
                  themes: game.themes.map((theme) => theme.id),
                  gameModes: game.gameModes.map((gameMode) => gameMode.id),
                  genres: game.genres.map((genre) => genre.id),
                  releaseDate: game.releaseDate
                    ? new Date(game.releaseDate)
                    : undefined,
                }}
                libraryGameData={libraryGame ?? undefined}
                isInLibrary={!!libraryGame}
                userId={userId}
                username={username ?? undefined}
                classNames={{
                  name: "hidden md:block",
                  link: "h-[max(35vh,160px)] sm:h-[max(35vh,160px)] md:h-[max(37.5vh,225px)] lg:h-[max(37.5vh,225px)] xl:h-[max(37.5vh,225px)]",
                }}
              />
            </div>
            <div className="hidden md:block absolute bottom-0 inset-x-0 z-10 text-white bg-[rgb(196,102,8)]/80 py-2">
              <Container>
                <Title className="drop-shadow-sm lg:mb-0 mb-0">
                  {game.name}{" "}
                  {game.releaseDate && (
                    <span className="font-medium text-gray-400 dark:text-muted-foreground">
                      ({new Date(game.releaseDate).getFullYear()})
                    </span>
                  )}
                </Title>
              </Container>
            </div>
          </div>
        </div>
        <div className="block md:hidden text-white bg-[rgb(196,102,8)] py-2">
          <Container>
            <Title size="small" className="drop-shadow-sm lg:mb-0 mb-0">
              {game.name}{" "}
              {game.releaseDate && (
                <span className="font-medium text-gray-400 dark:text-muted-foreground">
                  ({new Date(game.releaseDate).getFullYear()})
                </span>
              )}
            </Title>
          </Container>
        </div>
      </>
    )
  );
};
