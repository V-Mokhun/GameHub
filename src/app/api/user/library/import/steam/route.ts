import { auth } from "@clerk/nextjs";
import { libraryGameSchema } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const games = libraryGameSchema.array().parse(body);

    if (games.length === 0) return NextResponse.json(null, { status: 200 });

    if (!userId || userId !== games[0].userId)
      return new NextResponse("Unauthorized", { status: 401 });

    await db.$transaction(
      games.map((game) => {
        return db.game.upsert({
          where: {
            userId_id: {
              userId,
              id: game.id,
            },
          },
          create: game,
          update: {
            playTime: game.playTime,
          },
        });
      })
    );

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Could not import Steam library.");
  }
}
