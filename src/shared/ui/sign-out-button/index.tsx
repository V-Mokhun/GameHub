import { SignOutButton as AuthSignOutButton } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "../primitives";

interface SignOutButtonProps {
  children?: React.ReactNode;
  username: string;
  id: string;
}

export const SignOutButton = ({
  children,
  username,
  id,
}: SignOutButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <AuthSignOutButton
      signOutCallback={() => {
        queryClient.invalidateQueries({ queryKey: ["user", { username }] });
        queryClient.invalidateQueries({ queryKey: ["library", { username }] });
        queryClient.invalidateQueries({ queryKey: ["own-profile", { id }] });
        router.refresh();
        toast({ title: "Signed out succesfully", variant: "success" });
      }}
    >
      {children}
    </AuthSignOutButton>
  );
};
