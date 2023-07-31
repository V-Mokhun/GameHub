"use client";

import { FullGame } from "@shared/api";

interface GameInfoProps {
  game?: FullGame;
  isLoading: boolean;
}

export const GameInfo = ({ game, isLoading }: GameInfoProps) => {
  if (isLoading) return null;

  console.log(game);

  return <>game</>;
};
