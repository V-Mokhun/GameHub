import { GameStatus } from "@prisma/client";
import { z } from "zod";

export const addGameScheme = z.object({
  playTime: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n >= 0),
  notes: z.string().default(""),
  status: z.nativeEnum(GameStatus).default(GameStatus.WANT_TO_PLAY),
  finishedAt: z.date().nullable(),
});

export type AddGameScheme = z.infer<typeof addGameScheme>;
