import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { SignInForm } from "@widgets/forms";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In - GameHub",
  description: "Sign in to your GameHub account.",
};

export default async function SignInPage() {
  const { userId } = auth();
  if (userId) redirect(HOME_ROUTE);

  return userId ? null : <SignInForm />;
}
