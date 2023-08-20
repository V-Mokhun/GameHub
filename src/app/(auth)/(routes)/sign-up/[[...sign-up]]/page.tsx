import { SignUpForm } from "@widgets/forms";
import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - GameHub",
  description: "Sign up for a GameHub account.",
};

export default async function SignUpPage() {
  const { userId } = auth();
  if (userId) redirect(HOME_ROUTE);

  return userId ? null : <SignUpForm />;
}
