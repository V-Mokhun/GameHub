"use client";

import { gamesApi } from "@shared/api";

interface BrowseGamesProps {}

export const BrowseGames = ({}: BrowseGamesProps) => {
  const { data, isLoading } = gamesApi.getGames();

  console.log(data);

  return <div></div>;
};
