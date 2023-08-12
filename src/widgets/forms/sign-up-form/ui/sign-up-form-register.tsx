"use client";

import { useSignUp } from "@clerk/nextjs";
import { SocialLogin } from "@features/social-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRIVACY_ROUTE, SIGN_IN_ROUTE, TERMS_ROUTE } from "@shared/consts";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormSchema, signUpFormSchema } from "../model";

interface SignUpFormRegisterProps {
  onFormSubmit: () => void;
}

export const SignUpFormRegister = ({
  onFormSubmit,
}: SignUpFormRegisterProps) => {
  const { isLoaded, signUp } = useSignUp();
  const { toast } = useToast();

  const form = useForm<SignUpFormSchema>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormSchema> = async (data) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        username: data.username,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onFormSubmit();
      form.reset();
    } catch (err) {
      displayError(toast, err);
    }
  };

  return (
    <>
      <Title className="mb-2" size="large">
        Sign Up
      </Title>
      <Subtitle size="large">Get started today</Subtitle>
      <SocialLogin text="Continue with" />
      <TextSeparator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 text-left"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                <FormLabel>Password</FormLabel>
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
            Sign up
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-sm md:text-base">
        Already have an account? <Link href={SIGN_IN_ROUTE}>Sign in</Link>
      </p>
      <p className="mt-2 text-sm">
        By signing up, you agree to our{" "}
        <Link href={PRIVACY_ROUTE}>Privacy Policy</Link> and{" "}
        <Link href={TERMS_ROUTE}>Terms of Service</Link>.
      </p>
    </>
  );
};
