import { z } from "zod";

export const reviewFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be minimum 3 characters long")
    .max(100, "Title must be maximum 100 characters long"),
  body: z
    .string()
    .trim()
    .min(300, "Review must be minimum 300 characters long")
    .max(8000, "Review must be maximum 8000 characters long"),
  hasSpoiler: z.boolean().default(false),
  rating: z
    .number({ required_error: "Rating the game is required" })
    .min(1)
    .max(10),
});

export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;
