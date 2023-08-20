import { Container } from "@shared/ui";
import { UserFriendRequests } from "../ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friend Requests - GameHub",
  description: "Friend requests page",
};

export default async function UserFriendsReceivedPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <section>
      <Container>
        <UserFriendRequests username={params.username} />
      </Container>
    </section>
  );
}
