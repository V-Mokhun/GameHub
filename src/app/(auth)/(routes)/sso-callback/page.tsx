import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default async function SSOCallback() {
  return <AuthenticateWithRedirectCallback />;
}
