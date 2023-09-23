import { auth } from "@clerk/nextjs";
import { steam } from "@shared/config/steam";
import { HOME_ROUTE } from "@shared/consts";
import { Container, ExternalLink, Subtitle, Title } from "@shared/ui";
import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ImportGamesCallback } from "./ui";

export const metadata: Metadata = {
  title: "Import Games - GameHub",
  description: "Import your games from Steam",
};

const getSteamGamesData = async (profileId: string, onError: () => void) => {
  try {
    const { data } = await axios.get<{
      response: {
        game_count: number;
        games: { appid: number; playtime_forever: number }[];
      };
    }>(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${profileId}&format=json`
    );

    return data.response.games
      .sort((a, b) => a.playtime_forever - b.playtime_forever)
      .slice(20);
  } catch (error) {
    onError();
  }
};

export default async function ImportCallback({
  searchParams,
}: {
  searchParams: { "openid.claimed_id": string };
}) {
  const { userId } = auth();
  if (!userId || !searchParams["openid.claimed_id"]) redirect(HOME_ROUTE);

  const profileId = searchParams["openid.claimed_id"].split("/").pop();
  if (!profileId) redirect(HOME_ROUTE);

  const games = await getSteamGamesData(profileId, () => redirect(HOME_ROUTE));

  return (
    <section>
      <Container>
        <Title>Please wait while your games are being imported</Title>
        {games && <ImportGamesCallback userId={userId} games={games} />}
      </Container>
    </section>
  );
}
