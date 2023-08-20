import { SignOutButton as AuthSignOutButton } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "../primitives";

interface SignOutButtonProps {
  children?: React.ReactNode;
  username: string;
}

export const SignOutButton = ({ children, username }: SignOutButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <AuthSignOutButton
      signOutCallback={() => {
        queryClient.invalidateQueries({ queryKey: ["user", { username }] });
        queryClient.invalidateQueries({ queryKey: ["library", { username }] });
        router.refresh();
        toast({ title: "Signed out succesfully", variant: "success" });
      }}
    >
      {children}
    </AuthSignOutButton>
  );
};
