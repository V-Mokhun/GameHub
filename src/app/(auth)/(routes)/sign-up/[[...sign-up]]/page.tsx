import { SignUpForm } from "@widgets/forms";
import { auth } from "@clerk/nextjs";
import { HOME_ROUTE } from "@shared/consts";
import { redirect } from "next/navigation";

export default async function SignUpPage(data: any) {
  const { userId } = auth();
  if (userId) redirect(HOME_ROUTE);

  return userId ? null : <SignUpForm />;
}
