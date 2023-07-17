import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { ForgotPasswordForm } from "@widgets/forms";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
  const { userId } = auth();
  if (userId) redirect(HOME_ROUTE);

  return <ForgotPasswordForm />;
}
