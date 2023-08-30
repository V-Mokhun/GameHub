"use client";

import { useUser } from "@clerk/nextjs";
import { Game, gamesApi, userApi, userLibraryApi } from "@shared/api";
import { Container, Separator } from "@shared/ui";
import { GamesCarousel } from "@widgets/games-carousel";
import "keen-slider/keen-slider.min.css";
import { GameAbout } from "./game-about";
import { GameBanner } from "./game-banner";
import { GameMedia } from "./game-media";
import { GameSidebar } from "./game-sidebar";
import { GameRelated } from "./game-related";
import { GameCollection } from "./game-collection";
import { ViewedGames } from "@widgets/viewed-games";
import { useEffect } from "react";
import {
  RECENTLY_VIEWED_GAMES,
  RECENTLY_VIEWED_GAMES_LIMIT,
} from "@shared/consts";
import { useViewedGames } from "@shared/lib/hooks";

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

  useViewedGames(
    gameId,
    game
      ? {
          id: game.id,
          name: game.name,
          rating: game.rating,
          releaseDate: game.releaseDate,
          category: game.category,
          cover: game.cover,
          gameModes: game.gameModes.map((gm) => gm.id),
          genres: game.genres.map((g) => g.id),
          themes: game.themes.map((t) => t.id),
        }
      : undefined
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
              gameId={gameId}
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
            <ViewedGames
              gameId={gameId}
              libraryGames={libraryData?.library}
              userId={user?.id}
              username={user?.username}
            />
          </div>
          <GameSidebar isLoading={isLoading} game={game} />
        </div>
      </Container>
    </>
  );
};
