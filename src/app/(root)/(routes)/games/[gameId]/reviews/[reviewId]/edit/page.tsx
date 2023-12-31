import { auth } from "@clerk/nextjs";
import { REVIEWS_ROUTE } from "@shared/consts";
import { Container } from "@shared/ui";
import { redirect } from "next/navigation";
import { EditReview } from "./ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Review - GameHub",
  description: "Edit your review for a game",
};

export default async function EditReviewPage({
  params,
}: {
  params: { gameId: string; reviewId: string };
}) {
  const { gameId, reviewId } = params;
  const { userId } = auth();

  if (!userId || Number.isNaN(Number(reviewId)))
    return redirect(REVIEWS_ROUTE(gameId));

  return (
    <section>
      <Container>
        <EditReview gameId={gameId} reviewId={reviewId} authUserId={userId} />
      </Container>
    </section>
  );
}
