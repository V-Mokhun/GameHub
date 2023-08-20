import { currentUser } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { redirect } from "next/navigation";
import { Conversation } from "./ui";
import { Metadata } from "next";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  return {
    title: `Conversation with ${username} - GameHub`,
    description: `Conversation with ${username}`,
  };
}

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
