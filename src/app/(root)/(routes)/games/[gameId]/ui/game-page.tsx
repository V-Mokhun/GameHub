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
    <>
      <GameBanner
        libraryGame={libraryGame}
        userId={user?.id}
        username={user?.username}
        isLoading={isLoading}
        game={game}
      />
      <Container>
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <GameNotes
              username={user?.username || ""}
              libraryGame={libraryGame || null}
            />
            <GameMedia
              artworks={game?.artworks || []}
              screenshots={game?.screenshots || []}
              videos={game?.videos || []}
              isLoading={isLoading}
            />
            <GameSummary isLoading={isLoading} summary={game?.summary} />
            <Separator />
            <GameGames
              title="Similar Games"
              userId={user?.id}
              username={user?.username}
              games={game?.similarGames || []}
              libraryGames={libraryData?.library}
              isLoading={isLoading}
            />
            <GameGames
              title="Franchise"
              userId={user?.id}
              username={user?.username}
              games={game?.franchises || []}
              libraryGames={libraryData?.library}
              isLoading={isLoading}
            />
            <GameGames
              title="DLC"
              userId={user?.id}
              username={user?.username}
              games={game?.dlcs || []}
              libraryGames={libraryData?.library}
              isLoading={isLoading}
            />
          </div>
          <GameSidebar isLoading={isLoading} game={game} />
        </div>
      </Container>
    </>
  );
};
