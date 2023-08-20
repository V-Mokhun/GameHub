import { currentUser } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
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
      <Conversation username={params.username} />
    </section>
  );
}
