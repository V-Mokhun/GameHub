"use client";

import { useAuth } from "@clerk/nextjs";
import { gamesApi } from "@shared/api";
import { GameList } from "@widgets/game-list";

interface BrowseGamesProps {}

export const BrowseGames = ({}: BrowseGamesProps) => {
  const { userId } = useAuth();
  const { data, isLoading } = gamesApi.getGames();

  return <GameList userId={userId} games={data || []} />;
};
