import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { ForgotPasswordForm } from "@widgets/forms";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Forgot Password - GameHub",
  description: "Forgot your password? No problem!",
};

export default async function ForgotPasswordPage() {
  const { userId } = auth();
  if (userId) redirect(HOME_ROUTE);

  return userId ? null : <ForgotPasswordForm />;
}
