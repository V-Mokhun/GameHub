import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Container, Separator, Title } from "@shared/ui";
import { redirect } from "next/navigation";
import { ConversationsList } from "./ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages - GameHub",
  description: "Your messages on GameHub",
};

export default async function MessagesPage() {
  const { userId } = auth();

  if (!userId) return redirect(HOME_ROUTE);

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
