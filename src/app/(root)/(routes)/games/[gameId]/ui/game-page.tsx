"use client";

import { gamesApi, userLibraryApi } from "@shared/api";
import { Container } from "@shared/ui";
import { GameBanner } from "./game-banner";
import { GameInfo } from "./game-info";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { GameLibraryModal } from "@entities/game";

interface GamePageProps {
  gameId: string;
}

export const GamePage = ({ gameId }: GamePageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { data: game, isLoading } = gamesApi.getGame(gameId);
  const { data: libraryGame } = userLibraryApi.getLibraryGame(
    gameId,
    user?.id ?? undefined,
    user?.username ?? undefined
  );

  return (  
    <>
      {game && user && (
        <GameLibraryModal
          gameData={{
            category: game.category,
            id: game.id,
            name: game.name,
            cover: game.cover || "",
            rating: game.rating,
            themes: game.themes.map((theme) => theme.id),
            gameModes: game.gameModes.map((gameMode) => gameMode.id),
            genres: game.genres.map((genre) => genre.id),
            releaseDate: game.releaseDate,
          }}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          libraryGameData={libraryGame ?? undefined}
          userId={user.id}
          username={user.username!}
          isInLibrary={!!libraryGame}
        />
      )}
      <GameBanner
        libraryGame={libraryGame}
        userId={user?.id}
        onOpen={() => setIsOpen(true)}
        isLoading={isLoading}
        game={game}
      />
      <Container>
        <GameInfo game={game} isLoading={isLoading} />
      </Container>
    </>
  );
};
