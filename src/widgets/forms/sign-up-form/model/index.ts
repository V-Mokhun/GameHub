import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .optional(),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
