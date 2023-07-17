import { z } from "zod";

export const signInFormSchema = z.object({
  emailOrUsername: z
    .string({ required_error: "Email or Username is required" })
    .email("Invalid email address or username")
    .or(z.string().min(3, "Username is too short")),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
