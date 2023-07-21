"use client";

import { ChangeGamesView } from "@features/change-games-view";
import { useGameListStore } from "@widgets/game-list";

export const BrowseChangeView = ({}) => {
  const gameListStore = useGameListStore();

  return (
    <ChangeGamesView
      activeView={gameListStore.view}
      onGridClick={() => gameListStore.setView("grid")}
      onListClick={() => gameListStore.setView("list")}
    />
  );
};
