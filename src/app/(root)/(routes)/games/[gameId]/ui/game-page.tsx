"use client";

import { useUser } from "@clerk/nextjs";
import { gamesApi, userLibraryApi } from "@shared/api";
import { Container } from "@shared/ui";
import { GameBanner } from "./game-banner";
import { GameInfo } from "./game-info";

interface GamePageProps {
  gameId: string;
}

export const GamePage = ({ gameId }: GamePageProps) => {
  const { user } = useUser();
  const { data: game, isLoading } = gamesApi.getGame(gameId);
  const { data: libraryGame } = userLibraryApi.getLibraryGame(
    gameId,
    user?.id ?? undefined,
    user?.username ?? undefined
  );

  return (
    <>
      <GameBanner
        libraryGame={libraryGame}
        userId={user?.id}
        username={user?.username}
        isLoading={isLoading}
        game={game}
      />
      <Container>
        <GameInfo game={game} isLoading={isLoading} />
      </Container>
    </>
  );
};
