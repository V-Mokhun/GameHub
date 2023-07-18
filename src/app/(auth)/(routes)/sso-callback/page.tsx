import { AuthenticateWithRedirectCallback, auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { redirect } from "next/navigation";

export default async function SSOCallback() {
  const { userId } = auth();
  if (userId) redirect(HOME_ROUTE);

  return <AuthenticateWithRedirectCallback />;
}
