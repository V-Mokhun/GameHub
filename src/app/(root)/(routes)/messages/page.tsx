import { Container, Separator, Title } from "@shared/ui";
import { Conversations } from "./ui/conversations";

export default async function MessagesPage() {
  return (
    <section>
      <Container>
        <Title size="large">Your messages</Title>
        <Separator />
        <Conversations />
      </Container>
    </section>
  );
}
