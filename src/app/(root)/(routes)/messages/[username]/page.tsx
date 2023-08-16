import { Container } from "@shared/ui";
import { Conversation } from "./ui";

export default async function ConversationPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <section>
      <Container>
        <Conversation username={params.username} />
      </Container>
    </section>
  );
}
