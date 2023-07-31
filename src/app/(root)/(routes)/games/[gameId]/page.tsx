import { auth } from "@clerk/nextjs";
import { GamePage } from "./ui";

export default async function Page({ params }: { params: { gameId: string } }) {
  const { userId } = auth();

  return (
    <section>
      <GamePage userId={userId} gameId={params.gameId} />
    </section>
  );
}
