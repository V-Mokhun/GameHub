"use client";

import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
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

interface SignUpFormVerifyProps {
  onGoBack: () => void;
}

const signUpFormVerifySchema = z.object({
  code: z.string().min(6, "Code must be 6 characters long").max(6),
});

type SignUpFormVerifySchema = z.infer<typeof signUpFormVerifySchema>;

export const SignUpFormVerify = ({ onGoBack }: SignUpFormVerifyProps) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignUpFormVerifySchema>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(signUpFormVerifySchema),
  });

  const onSubmit: SubmitHandler<SignUpFormVerifySchema> = async (data) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });
      if (completeSignUp.status === "complete") {
        toast({ title: "Signed in successfully", variant: "success" });
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
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
      form.reset();
    }
  };

  return (
    <>
      <Title className="mb-4" size="large">
        Verify your email
      </Title>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-left mb-2"
        >
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
            Verify
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
