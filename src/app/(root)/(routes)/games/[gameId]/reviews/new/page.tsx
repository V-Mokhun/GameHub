import { Container } from "@shared/ui";
import { CreateReview } from "./ui";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { REVIEWS_ROUTE } from "@shared/consts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Review - GameHub",
  description: "Create a review for a game",
};

export default async function CreateReviewPage({
  params,
}: {
  params: { gameId: string };
}) {
  const { gameId } = params;
  const { userId } = auth();

  if (!userId) return redirect(REVIEWS_ROUTE(gameId));

  return (
    <section>
      <Container>
        <CreateReview gameId={gameId} userId={userId} />
      </Container>
    </section>
  );
}
