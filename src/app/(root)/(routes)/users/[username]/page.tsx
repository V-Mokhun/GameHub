import { currentUser } from "@clerk/nextjs";
import { UserProfile } from "./ui";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await currentUser();
  const isOwnProfile = user?.username === params.username;

  return (
    <UserProfile isOwnProfile={isOwnProfile} username={params.username} />
  );
}
