"use client";

import { Link, Title } from "@shared/ui";
import { GameSummary } from "./game-summary";
import { GameNotes } from "./game-notes";
import {
  FullGame,
  GAME_CATEGORIES,
  GameCategories,
  NormalizedLibraryGame,
} from "@shared/api";

interface GameAboutProps {
  game?: FullGame;
  isLoading: boolean;
  username: string | null;
  libraryGame?: NormalizedLibraryGame | null;
}

export const GameAbout = ({
  isLoading,
  game,
  username,
  libraryGame,
}: GameAboutProps) => {
  return (
    <>
      <Title>About</Title>
      {game?.parent && (
        <p>
          <span className="font-semibold">{game.name}</span> is
          {`${
            game.category === GameCategories.EPISODE ||
            game.category === GameCategories.EXPANSION ||
            game.category === GameCategories.UPDATE ||
            game.category === GameCategories.EXPANDED_GAME
              ? "an"
              : "a"
          }${GAME_CATEGORIES[game.category]}`}{" "}
          for <Link href={`/games/${game.parent.id}`}>{game.parent.name}</Link>
        </p>
      )}
      <GameSummary isLoading={isLoading} summary={game?.summary} />
      <GameNotes username={username || ""} libraryGame={libraryGame || null} />
    </>
  );
};
