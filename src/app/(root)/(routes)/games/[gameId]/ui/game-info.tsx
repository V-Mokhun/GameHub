"use client";

import { gamesApi } from "@shared/api";

interface GameInfoProps {
  gameId: string;
}

export const GameInfo = ({ gameId }: GameInfoProps) => {
  const { data: game, isLoading } = gamesApi.getGame(gameId);

  console.log(game);

  return <>game</>;
};
