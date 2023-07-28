"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { HOME_ROUTE } from "@shared/consts";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Title,
  useToast,
} from "@shared/ui";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface ForgotPasswordFormVerifyProps {
  onGoBack: () => void;
}

const forgotPasswordFormVerifySchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  code: z.string().min(6, "Code must be 6 characters long").max(6),
});

type ForgotPasswordFormVerifySchema = z.infer<
  typeof forgotPasswordFormVerifySchema
>;

export const ForgotPasswordFormVerify = ({
  onGoBack,
}: ForgotPasswordFormVerifyProps) => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ForgotPasswordFormVerifySchema>({
    defaultValues: {
      code: "",
      password: "",
    },
    resolver: zodResolver(forgotPasswordFormVerifySchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormVerifySchema> = async (
    data
  ) => {
    if (!isLoaded) return;

    try {
      const completeReset = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });

      if (completeReset.status === "complete") {
        toast({
          title: "Password has been changed",
          variant: "success",
        });
        await setActive({ session: completeReset.createdSessionId });
        router.push(HOME_ROUTE);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
        form.reset();
      }
    } catch (err) {
      toast({
        title: "Code is incorrect",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Title className="mb-4" size="large">
        Reset password
      </Title>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-left mb-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification code</FormLabel>
                <FormControl>
                  <Input maxLength={6} placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!isLoaded || form.formState.isSubmitting}
            className="w-full font-bold"
            type="submit"
          >
            Change password
          </Button>
        </form>
      </Form>
      <Button
        variant="secondary"
        type="button"
        className="w-full font-bold"
        onClick={onGoBack}
      >
        <Icon name="ArrowLeft" className="mr-1 text-current" /> Go back
      </Button>
    </>
  );
};
