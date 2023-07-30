import { Container } from "@shared/ui";
import { GameInfo } from "./ui";

export default async function GamePage({
  params,
}: {
  params: { gameId: string };
}) {
  return (
    <section>
      <Container>
        <GameInfo gameId={params.gameId} />
      </Container>
    </section>
  );
}
