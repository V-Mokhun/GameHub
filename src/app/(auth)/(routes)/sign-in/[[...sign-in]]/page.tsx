import { SignInForm } from "@widgets/forms";
import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { userId } = auth();
  if (userId) redirect(HOME_ROUTE);

  return userId ? null : <SignInForm />;
}
