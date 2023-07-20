import { z } from "zod";

export const passwordSettingsFormSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Old Password must be at least 8 characters long" })
      .max(32, { message: "Old Password must be at most 32 characters long" }),
    newPassword: z
      .string()
      .min(8, { message: "New Password must be at least 8 characters long" })
      .max(32, { message: "New Password must be at most 32 characters long" }),
  })

export type PasswordSettingsFormSchema = z.infer<
  typeof passwordSettingsFormSchema
>;
