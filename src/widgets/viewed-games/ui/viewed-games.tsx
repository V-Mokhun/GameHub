"use client";

import { NormalizedLibraryGame } from "@shared/api";
import { RECENTLY_VIEWED_GAMES } from "@shared/consts";
import { GamesCarousel } from "@widgets/games-carousel";
import { useMemo } from "react";

interface ViewedGamesProps {
  userId?: string | null;
  username?: string | null;
  libraryGames?: NormalizedLibraryGame[];
  gameId?: string;
}

export const ViewedGames = ({
  libraryGames,
  userId,
  username,
  gameId,
}: ViewedGamesProps) => {
  const viewedGames = useMemo(
    () => JSON.parse(localStorage.getItem(RECENTLY_VIEWED_GAMES) ?? "[]"),
    [gameId]
  );

  return (
    <GamesCarousel
      title="Games you've looked at before"
      userId={userId}
      username={username}
      games={viewedGames}
      libraryGames={libraryGames}
    />
  );
};
