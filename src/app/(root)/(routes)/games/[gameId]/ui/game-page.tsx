"use client";

import { useUser } from "@clerk/nextjs";
import { gamesApi, userApi, userLibraryApi } from "@shared/api";
import { Container } from "@shared/ui";
import { GameBanner } from "./game-banner";
import { GameSidebar } from "./game-sidebar";
import { GameGames } from "./game-games";

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
  const { data: libraryData } = userLibraryApi.getLibrary(
    user?.username ?? undefined,
    { noLimit: true, enabled: true }
  );
  console.log(game?.franchises);

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
          <div className="flex items-start mt-6 gap-4">
            <div className="flex-1 min-w-0">
              <p className="mb-6 text-sm md:text-base">{game.summary}</p>
              <GameGames
                title="Franchise"
                userId={user?.id}
                username={user?.username}
                games={game.franchises}
                libraryGames={libraryData?.library}
              />
            </div>
            <GameSidebar game={game} />
          </div>
        </Container>
      </>
    )
  );
};
