import { SignOutButton as AuthSignOutButton } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../primitives";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  children?: React.ReactNode;
}

export const SignOutButton = ({ children }: SignOutButtonProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return (
    <AuthSignOutButton
      signOutCallback={() => {
        queryClient.refetchQueries({ queryKey: ["user"] });
        toast({ title: "Signed out succesfully", variant: "success" });
      }}
    >
      {children}
    </AuthSignOutButton>
  );
};
