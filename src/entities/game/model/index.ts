import { GameStatus } from "@prisma/client";
import { z } from "zod";

export const addGameScheme = z.object({
  playTime: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n >= 0, "Time must be a positive number")
    .refine(
      (n) => n <= 15000,
      "Time must be less than 15000 hours (yes, really)"
    ),
  notes: z.string().default(""),
  status: z.nativeEnum(GameStatus).default(GameStatus.WANT_TO_PLAY),
  finishedAt: z.date().nullable(),
});

export type AddGameScheme = z.infer<typeof addGameScheme>;
