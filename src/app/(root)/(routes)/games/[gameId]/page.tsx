import { GamePage } from "./ui";

export default async function Page({ params }: { params: { gameId: string } }) {
  return (
    <section>
      <GamePage gameId={params.gameId} />
    </section>
  );
}
