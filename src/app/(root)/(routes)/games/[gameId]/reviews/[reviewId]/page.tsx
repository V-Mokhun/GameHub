import { Container } from "@shared/ui";
import { Metadata } from "next";
import { GameReview } from "./ui";

export const metadata: Metadata = {
  title: "Game Review - GameHub",
  description: "Game Review",
};

export default async function GameReviewPage({
  params,
}: {
  params: { gameId: string; reviewId: string };
}) {
  const { gameId, reviewId } = params;

  return (
    <section>
      <Container>
        <GameReview gameId={gameId} reviewId={reviewId} />
      </Container>
    </section>
  );
}
