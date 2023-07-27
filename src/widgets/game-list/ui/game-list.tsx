"use client";

import { GameCard } from "@entities/game";
import { Game, userLibraryApi } from "@shared/api";
import { useGameListStore } from "../model";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@shared/ui";

interface GameListProps {
  userId?: string | null;
  games: Game[];
}

export const GameList = ({ games, userId }: GameListProps) => {
  const { data: libraryGames = [] } = userLibraryApi.getLibrary(userId || "");
  const view = useGameListStore((state) => state.view);

  const content = games.map((game, i) => {
    const libraryGame = libraryGames.find((g) => g.id === game.id);
    if (!libraryGame)
      return (
        <GameCard rank={i + 1} userId={userId} key={game.id} game={game} />
      );

    return (
      <GameCard
        key={game.id}
        game={game}
        isInLibrary={true}
        userId={userId!}
        rank={i + 1}
        libraryGameData={{
          finishedAt: libraryGame.finishedAt,
          notes: libraryGame.notes,
          playTime: libraryGame.playTime,
          status: libraryGame.status,
          userRating: libraryGame.userRating,
        }}
      />
    );
  });

  return view === "grid" ? (
    <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-6">{content}</div>
  ) : (
    <Table className="whitespace-nowrap xs:whitespace-normal">
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="text-right">Library</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{content}</TableBody>
    </Table>
  );
};
