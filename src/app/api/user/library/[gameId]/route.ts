import { auth } from "@clerk/nextjs";
import { libraryGameSchema } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { userId } = auth();
    const { gameId } = params;

    if (!gameId)
      return new NextResponse("Game ID is required", { status: 400 });

    const body = await req.json();
    const { ...game } = libraryGameSchema.parse(body);

    if (!userId || userId !== game.userId)
      return new NextResponse("Unauthorized", { status: 401 });

    await db.game.create({
      data: game,
    });

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to add game to library");
  }
}
