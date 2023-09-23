"use client";

import { GameStatus, Game as LibraryGame } from "@prisma/client";
import { STEAM_URL, gamesApi, userLibraryApi } from "@shared/api";
import { Subtitle } from "@shared/ui";

interface ImportGamesCallbackProps {
  games: { appid: number; playtime_forever: number }[];
  userId: string;
}

export const ImportGamesCallback = ({
  games,
  userId,
}: ImportGamesCallbackProps) => {
  const { mutate: importGames } = userLibraryApi.importSteamLibrary();
  gamesApi.getGamesFromSteam(
    games.map((game) => game.appid),
    async (data) => {
      const modifiedGames: LibraryGame[] = data.map((game) => {
        const {
          websites,
          cover,
          rating,
          releaseDate,
          gameModes,
          genres,
          themes,
          ...restGame
        } = game;
        const appId = websites
          .find((website) => website.url.includes(STEAM_URL))
          ?.url.split("/")
          .pop()!;
        const playTimeMinutes =
          games.find((g) => g.appid === Number(appId))?.playtime_forever ?? 0;
        const playTime = Math.round(playTimeMinutes / 60);

        return {
          ...restGame,
          gameModes: gameModes.join(",") || "",
          genres: genres.join(",") || "",
          themes: themes.join(",") || "",
          releaseDate: releaseDate || null,
          coverUrl: cover ?? "",
          totalRating: rating,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId,
          userRating: null,
          finishedAt: null,
          notes: "",
          playTime,
          status: playTime > 0 ? GameStatus.PLAYING : GameStatus.WANT_TO_PLAY,
        };
      });

      await importGames(modifiedGames);
    }
  );

  return <Subtitle size="large">Importing...</Subtitle>;
};
