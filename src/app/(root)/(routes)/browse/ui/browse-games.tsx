"use client";

import { gamesApi } from "@shared/api";
import { GameList } from "@widgets/game-list";

interface BrowseGamesProps {}

export const BrowseGames = ({}: BrowseGamesProps) => {
  const { data, isLoading } = gamesApi.getGames();

  console.log(data);

  return <GameList games={data || []} />;
};
