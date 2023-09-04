import { auth } from "@clerk/nextjs";
import { REVIEWS_ROUTE } from "@shared/consts";
import { Container } from "@shared/ui";
import { redirect } from "next/navigation";

export default async function EditReviewPage({
  params,
}: {
  params: { gameId: string };
}) {
  const { gameId } = params;
  const { userId } = auth();

  if (!userId) return redirect(REVIEWS_ROUTE(gameId));

  return (
    <section>
      <Container></Container>
    </section>
  );
}
