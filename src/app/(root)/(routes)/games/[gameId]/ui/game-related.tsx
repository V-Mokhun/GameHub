"use client";

import { FullGame, NormalizedLibraryGame } from "@shared/api";
import {
  Container,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Title,
} from "@shared/ui";
import { GamesCarousel } from "@widgets/games-carousel";

interface GameRelatedProps {
  game?: FullGame;
  isLoading: boolean;
  userId?: string | null;
  username?: string | null;
  libraryGames?: NormalizedLibraryGame[];
}

enum TabValues {
  DLCS = "dlcs",
  EXPANSIONS = "expansions",
  REMAKES = "remakes",
  REMASTERS = "remasters",
}

export const GameRelated = ({
  game,
  isLoading,
  libraryGames,
  userId,
  username,
}: GameRelatedProps) => {
  if (isLoading) return null;

  let defaultValue: TabValues | undefined = undefined;
  if ((game?.dlcs || []).length > 0) defaultValue = TabValues.DLCS;
  else if ((game?.expansions || []).length > 0)
    defaultValue = TabValues.EXPANSIONS;
  else if ((game?.remakes || []).length > 0) defaultValue = TabValues.REMAKES;
  else if ((game?.remasters || []).length > 0)
    defaultValue = TabValues.REMASTERS;

  return (
    defaultValue && (
      <>
        <Title>Related</Title>
        <Tabs defaultValue={defaultValue}>
          <TabsList className="mb-2">
            {(game?.dlcs || []).length > 0 && (
              <TabsTrigger value={TabValues.DLCS}>DLCs</TabsTrigger>
            )}
            {(game?.expansions || []).length > 0 && (
              <TabsTrigger value={TabValues.EXPANSIONS}>Expansions</TabsTrigger>
            )}
            {(game?.remakes || []).length > 0 && (
              <TabsTrigger value={TabValues.REMAKES}>Remakes</TabsTrigger>
            )}
            {(game?.remasters || []).length > 0 && (
              <TabsTrigger value={TabValues.REMASTERS}>Remasters</TabsTrigger>
            )}
          </TabsList>
          {(game?.dlcs || []).length > 0 && (
            <TabsContent value={TabValues.DLCS}>
              <GamesCarousel
                userId={userId}
                username={username}
                games={game?.dlcs || []}
                libraryGames={libraryGames}
                isLoading={isLoading}
              />
            </TabsContent>
          )}
          {(game?.expansions || []).length > 0 && (
            <TabsContent value={TabValues.EXPANSIONS}>
              <GamesCarousel
                userId={userId}
                username={username}
                games={game?.expansions || []}
                libraryGames={libraryGames}
                isLoading={isLoading}
              />
            </TabsContent>
          )}
          {(game?.remakes || []).length > 0 && (
            <TabsContent value={TabValues.REMAKES}>
              <GamesCarousel
                userId={userId}
                username={username}
                games={game?.remakes || []}
                libraryGames={libraryGames}
                isLoading={isLoading}
              />
            </TabsContent>
          )}
          {(game?.remasters || []).length > 0 && (
            <TabsContent value={TabValues.REMASTERS}>
              <GamesCarousel
                userId={userId}
                username={username}
                games={game?.remasters || []}
                libraryGames={libraryGames}
                isLoading={isLoading}
              />
            </TabsContent>
          )}
        </Tabs>
      </>
    )
  );
};
