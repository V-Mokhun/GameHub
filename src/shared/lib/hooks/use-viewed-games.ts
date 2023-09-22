"use client";

import { Game } from "@shared/api";
import {
  RECENTLY_VIEWED_GAMES,
  RECENTLY_VIEWED_DEFAULT_LIMIT,
} from "@shared/consts";
import { useEffect } from "react";

export const useViewedGames = (gameId: string, game?: Game) => {
  useEffect(() => {
    if (!game) return;

    const viewedGames: Game[] = JSON.parse(
      localStorage.getItem(RECENTLY_VIEWED_GAMES) ?? "[]"
    );
    const gameIndex = viewedGames.findIndex((g) => String(g.id) === gameId);
    if (gameIndex === 0) return;

    if (gameIndex !== -1) {
      viewedGames.splice(gameIndex, 1);
    }

    if (viewedGames.length > RECENTLY_VIEWED_DEFAULT_LIMIT) {
      viewedGames.pop();
    }

    viewedGames.unshift(game);

    localStorage.setItem(RECENTLY_VIEWED_GAMES, JSON.stringify(viewedGames));
  }, [gameId, game]);
};
