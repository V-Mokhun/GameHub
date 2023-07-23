import { GameCard } from "@entities/game";
import { Game } from "@shared/api";

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-x-4 md:gap-y-8">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};
