"use client";

import { ExternalLink, Link, Title } from "@shared/ui";
import { GameSummary } from "./game-summary";
import { GameNotes } from "./game-notes";
import {
  FullGame,
  GAME_CATEGORIES,
  GAME_WEBSITES,
  GameCategories,
  NormalizedLibraryGame,
} from "@shared/api";
import Image from "next/image";

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
    <div className="mb-6">
      <Title>About</Title>
      {game?.parent && (
        <p className="mb-2">
          <span className="font-bold">{game.name}</span> is
          {`${
            game.category === GameCategories.EPISODE ||
            game.category === GameCategories.EXPANSION ||
            game.category === GameCategories.UPDATE ||
            game.category === GameCategories.EXPANDED_GAME
              ? " an "
              : " a "
          }${GAME_CATEGORIES[game.category]}`}{" "}
          for <Link href={`/games/${game.parent.id}`}>{game.parent.name}</Link>
        </p>
      )}
      <GameSummary isLoading={isLoading} summary={game?.summary} />
      <GameNotes username={username || ""} libraryGame={libraryGame || null} />
      {game?.websites && game.websites.length > 0 && (
        <ul className="flex gap-4 flex-wrap mt-8">
          {game.websites.map((website) => (
            <li key={website.category}>
              <ExternalLink
                className="inline-flex gap-1 items-center text-foreground"
                href={website.url}
              >
                {GAME_WEBSITES[website.category].Icon}
                <span className="text-sm">{GAME_WEBSITES[website.category].name}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
