"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  SIGN_UP_ROUTE,
} from "@shared/consts";
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
  TextSeparator,
  Title,
  useToast,
} from "@shared/ui";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormSchema, signInFormSchema } from "../model";
import { SocialLogin } from "@features/social-login";

interface SignInFormProps {}

export const SignInForm = ({}: SignInFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded, signIn, setActive } = useSignIn();
  const form = useForm<SignInFormSchema>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit: SubmitHandler<SignInFormSchema> = async (data) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.emailOrUsername,
        password: data.password,
      });

      if (result.status === "complete") {
        toast({ title: "Signed in successfully", variant: "success" });
        await setActive({ session: result.createdSessionId });
        router.push(HOME_ROUTE);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (err) {
      displayError(toast, err);
    }
  };

  return (
    <>
      <Title className="mb-2" size="large">
        Sign In
      </Title>
      <Subtitle size="large">
        Enter your credentials to access your account
      </Subtitle>
      <SocialLogin text="Sign in with" />
      <TextSeparator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-left"
        >
          <FormField
            control={form.control}
            name="emailOrUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="Email or Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-2">
                  <FormLabel>Password</FormLabel>
                  <Link href={FORGOT_PASSWORD_ROUTE}>Forgot password?</Link>
                </div>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
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
            Sign In
          </Button>
        </form>
      </Form>
      <p className="mt-4">
        Not a member? <Link href={SIGN_UP_ROUTE}>Sign up</Link>
      </p>
    </>
  );
};
