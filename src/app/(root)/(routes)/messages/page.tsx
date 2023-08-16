import { Container, Separator, Title } from "@shared/ui";
import { ConversationsList } from "./ui";

export default async function MessagesPage() {
  return (
    <section>
      <Container>
        <Title size="large">Your messages</Title>
        <Separator />
        <ConversationsList />
      </Container>
    </section>
  );
}
