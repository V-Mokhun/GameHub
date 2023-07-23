import { GameStatus } from "@prisma/client";
import { z } from "zod";

export const addGameScheme = z.object({
  playTime: z.number().int().positive().optional(),
  notes: z.string().optional(),
  status: z.nativeEnum(GameStatus).default(GameStatus.WANT_TO_PLAY),
  finishedDate: z.date().nullish(),
});

export type AddGameScheme = z.infer<typeof addGameScheme>;
