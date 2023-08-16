import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Container } from "@shared/ui";
import { redirect } from "next/navigation";
import { Conversation } from "./ui";

export default async function ConversationPage({
  params,
}: {
  params: { username: string };
}) {
  const { userId } = auth();

  if (!userId) return redirect(HOME_ROUTE);

  return (
    <section>
      <Container>
        <Conversation username={params.username} />
      </Container>
    </section>
  );
}
