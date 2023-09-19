import { Container } from "@shared/ui";
import { ReviewsPage } from "./ui";

export default async function GameReviewsPage({
  params,
}: {
  params: { gameId: string };
}) {
  return (
    <section>
      <Container>
        <ReviewsPage gameId={params.gameId} />
      </Container>
    </section>
  );
}
