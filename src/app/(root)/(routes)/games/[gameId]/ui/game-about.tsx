"use client";

import { Button, ExternalLink, Link, Title } from "@shared/ui";
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
import { GameFriends } from "./game-friends";
import { useAuth } from "@clerk/nextjs";
import { useCustomToasts } from "@shared/lib/hooks";
import { useRouter } from "next/navigation";
import { CREATE_REVIEW_ROUTE } from "@shared/consts";

interface GameAboutProps {
  game?: FullGame;
  gameId: string;
  isLoading: boolean;
  username: string | null;
  libraryGame?: NormalizedLibraryGame | null;
}

export const GameAbout = ({
  isLoading,
  game,
  username,
  libraryGame,
  gameId,
}: GameAboutProps) => {
  const { userId } = useAuth();
  const { signInToast } = useCustomToasts();
  const router = useRouter();

  return (
    <div className="mb-6 mt-4 md:mt-2">
      <Button
        className="mb-4"
        onClick={() => {
          if (!userId) signInToast();

          router.push(CREATE_REVIEW_ROUTE(gameId));
        }}
      >
        Write a Review
      </Button>
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
      <GameFriends gameId={gameId} />
      {game?.websites && game.websites.length > 0 && (
        <ul className="flex gap-4 flex-wrap md:mt-8 md:mb-6 mt-6 mb-4">
          {game.websites
            .sort((a, b) => a.category - b.category)
            .map((website) => (
              <li key={website.category}>
                <ExternalLink
                  className="inline-flex gap-1 items-center text-foreground"
                  href={website.url}
                >
                  {GAME_WEBSITES[website.category].Icon}
                  <span className="text-sm">
                    {GAME_WEBSITES[website.category].name}
                  </span>
                </ExternalLink>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
