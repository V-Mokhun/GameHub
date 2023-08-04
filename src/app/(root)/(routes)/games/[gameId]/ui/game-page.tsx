"use client";

import { useUser } from "@clerk/nextjs";
import { gamesApi, userLibraryApi } from "@shared/api";
import { Container } from "@shared/ui";
import { GameBanner } from "./game-banner";
import { GameSidebar } from "./game-sidebar";

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
    game && (
      <>
        <GameBanner
          libraryGame={libraryGame}
          userId={user?.id}
          username={user?.username}
          isLoading={isLoading}
          game={game}
        />
        <Container>
          <div className="flex mt-6 gap-4">
            <div className="flex-1">
              <p className="mb-6">{game.summary}</p>
              
            </div>
            <GameSidebar game={game} />
          </div>
        </Container>
      </>
    )
  );
};
