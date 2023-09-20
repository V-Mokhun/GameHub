import { Metadata } from "next";
import { GamePage } from "./ui";
import { redirect } from "next/navigation";
import { BROWSE_ROUTE } from "@shared/consts";

export const metadata: Metadata = {
  title: "Game - GameHub",
  description: "Game page",
};

export default async function Page({ params }: { params: { gameId: string } }) {
  if (Number.isNaN(Number(params.gameId))) return redirect(BROWSE_ROUTE);

  return (
    <section>
      <GamePage gameId={params.gameId} />
    </section>
  );
}
