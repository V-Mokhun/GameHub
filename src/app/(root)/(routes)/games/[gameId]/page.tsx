import { Metadata } from "next";
import { GamePage } from "./ui";

export const metadata: Metadata = {
  title: "Game - GameHub",
  description: "Game page",
};

export default async function Page({ params }: { params: { gameId: string } }) {
  return (
    <section>
      <GamePage gameId={params.gameId} />
    </section>
  );
}
