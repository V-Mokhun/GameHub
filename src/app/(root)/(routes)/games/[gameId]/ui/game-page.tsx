"use client";

import { gamesApi } from "@shared/api";
import { Container, Title } from "@shared/ui";
import { GameInfo } from "./game-info";
import Image from "next/image";

interface GamePageProps {
  gameId: string;
}

export const GamePage = ({ gameId }: GamePageProps) => {
  const { data: game, isLoading } = gamesApi.getGame(gameId);

  if (!game) return null;
  console.log(game);

  return (
    <>
      <div className="relative -mt-6 h-[30vh] md:h-[50vh] w-full md:-mt-5">
        <div className="absolute inset-x-0 top-0 z-0 h-full overflow-hidden -mx-2 sm:-mx-5 md:-mx-6">
          <Image
            className="w-full h-full object-cover blur-sm"
            fill
            alt={game.name}
            src={game.artworks[0] || game.cover || ""}
          />
          <div className="hidden md:block absolute bottom-0 inset-x-0 z-10 text-white bg-[rgb(255,196,0)]/70 dark:bg-[rgb(255,145,0)]/70 py-2">
            <Container>
              <Title className="drop-shadow-sm lg:mb-0 mb-0">
                {game.name}{" "}
                {game.releaseDate && (
                  <span className="font-medium text-muted-foreground">
                    ( {new Date(game.releaseDate).getFullYear()} )
                  </span>
                )}
              </Title>
            </Container>
          </div>
        </div>
      </div>
      <div className="block md:hidden text-white bg-secondary -mx-2 sm:-mx-4 py-2">
        <Container>
          <Title size="small" className="drop-shadow-sm lg:mb-0 mb-0">
            {game.name}{" "}
            {game.releaseDate && (
              <span className="font-medium text-muted-foreground">
                ({new Date(game.releaseDate).getFullYear()})
              </span>
            )}
          </Title>
        </Container>
      </div>

      <Container>
        <GameInfo gameId={gameId} />
      </Container>
    </>
  );
};
