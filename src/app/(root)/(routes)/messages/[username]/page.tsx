import { auth, currentUser } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { Container } from "@shared/ui";
import { redirect } from "next/navigation";
import { Conversation } from "./ui";

export default async function ConversationPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await currentUser();

  if (!user?.id || user.username === params.username)
    return redirect(HOME_ROUTE);

  return (
    <section className="h-full">
      <Container className="px-0 md:px-0">
        <Conversation username={params.username} />
      </Container>
    </section>
  );
}
