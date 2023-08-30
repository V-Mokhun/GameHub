"use client";

import { useUser } from "@clerk/nextjs";
import { gamesApi, userApi, userLibraryApi } from "@shared/api";
import { Container, Separator } from "@shared/ui";
import { GamesCarousel } from "@widgets/games-carousel";
import "keen-slider/keen-slider.min.css";
import { GameAbout } from "./game-about";
import { GameBanner } from "./game-banner";
import { GameMedia } from "./game-media";
import { GameSidebar } from "./game-sidebar";
import { GameRelated } from "./game-related";
import { GameCollection } from "./game-collection";

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
            <GameAbout
              libraryGame={libraryGame}
              username={user?.username ?? ""}
              isLoading={isLoading}
              game={game}
            />
            <GameMedia
              artworks={game?.artworks || []}
              screenshots={game?.screenshots || []}
              videos={game?.videos || []}
              isLoading={isLoading}
            />
            <Separator />
            <GameRelated
              userId={user?.id}
              username={user?.username}
              libraryGames={libraryData?.library}
              isLoading={isLoading}
              game={game}
            />
            <GameCollection
              isLoading={isLoading}
              userId={user?.id}
              username={user?.username}
              games={game?.collection || []}
              libraryGames={libraryData?.library}
              gameId={game?.id}
              title="Series"
            />
            <GameCollection
              isLoading={isLoading}
              userId={user?.id}
              username={user?.username}
              games={game?.franchise || []}
              libraryGames={libraryData?.library}
              gameId={game?.id}
              title="Franchise"
            />
            <GamesCarousel
              title="Similar"
              userId={user?.id}
              username={user?.username}
              games={game?.similarGames || []}
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
