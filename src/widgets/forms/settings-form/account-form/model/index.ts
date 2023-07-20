import { z } from "zod";

export const accountSettingsFormSchema = z.object({
  imageUrl: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  isPrivateLibrary: z.boolean(),
});

export type AccountSettingsFormSchema = z.infer<typeof accountSettingsFormSchema>;
