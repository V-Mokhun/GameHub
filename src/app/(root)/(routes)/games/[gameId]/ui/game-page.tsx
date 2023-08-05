"use client";

import { useUser } from "@clerk/nextjs";
import { gamesApi, userLibraryApi } from "@shared/api";
import { Container, Separator } from "@shared/ui";
import "keen-slider/keen-slider.min.css";
import { GameBanner } from "./game-banner";
import { GameGames } from "./game-games";
import { GameMedia } from "./game-media";
import { GameSidebar } from "./game-sidebar";
import { GameNotes } from "./game-notes";
import { GameSummary } from "./game-summary";

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
              {libraryGame && user && (
                <GameNotes
                  username={user.username!}
                  libraryGame={libraryGame}
                />
              )}
              <GameMedia
                artworks={game.artworks}
                screenshots={game.screenshots}
                videos={game.videos}
              />
              {game.summary && <GameSummary summary={game.summary} />}
              <Separator />
              {game.similarGames.length > 0 && (
                <GameGames
                  title="Similar Games"
                  userId={user?.id}
                  username={user?.username}
                  games={game.similarGames}
                  libraryGames={libraryData?.library}
                />
              )}
              {game.franchises.length > 0 && (
                <GameGames
                  title="Franchise"
                  userId={user?.id}
                  username={user?.username}
                  games={game.franchises}
                  libraryGames={libraryData?.library}
                />
              )}
              {game.dlcs.length > 0 && (
                <GameGames
                  title="DLC"
                  userId={user?.id}
                  username={user?.username}
                  games={game.dlcs}
                  libraryGames={libraryData?.library}
                />
              )}
            </div>
            <GameSidebar game={game} />
          </div>
        </Container>
      </>
    )
  );
};
