"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGN_UP_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Link,
  Subtitle,
  Title,
  useToast,
} from "@shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface ForgotPasswordFormRegisterProps {
  onFormSubmit: () => void;
}

const forgotPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;

export const ForgotPasswordFormRegister = ({
  onFormSubmit,
}: ForgotPasswordFormRegisterProps) => {
  const { isLoaded, signIn } = useSignIn();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormSchema> = async (data) => {
    if (!isLoaded) return;

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      });

      onFormSubmit();
      form.reset();
    } catch (err) {
      displayError(toast, err);
    }
  };

  return (
    <>
      <Title className="mb-2" size="large">
        Forgot Your Password?
      </Title>
      <Subtitle>
        Don&apos;t worry, it happens! Tell us your email address and we&apos;ll
        send you a password reset code.
      </Subtitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-left"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="me@me.com" {...field} />
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
            Request code
          </Button>
        </form>
      </Form>
      <p className="mt-4">
        Don&apos;t have an account? <Link href={SIGN_UP_ROUTE}>Sign up</Link>
      </p>
    </>
  );
};
