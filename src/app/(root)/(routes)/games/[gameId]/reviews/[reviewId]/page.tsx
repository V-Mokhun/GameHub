import { Container } from "@shared/ui";
import { Metadata } from "next";
import { GameReview } from "./ui";
import { auth } from "@clerk/nextjs";
import { REVIEWS_ROUTE } from "@shared/consts";
import { redirect } from "next/navigation";

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
  const { userId } = auth();

  if (Number.isNaN(Number(reviewId))) return redirect(REVIEWS_ROUTE(gameId));

  return (
    <section>
      <Container>
        <GameReview authUserId={userId} gameId={gameId} reviewId={reviewId} />
      </Container>
    </section>
  );
}
