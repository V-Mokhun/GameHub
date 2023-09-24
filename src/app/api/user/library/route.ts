import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const { userId: authUserId } = auth();
    const body = await req.json();
    const { userId } = z.object({ userId: z.string() }).parse(body);

    if (authUserId !== userId)
      return new NextResponse("Unauthorized", { status: 401 });

    await db.game.deleteMany({
      where: {
        userId,
      },
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Could not delete library.");
  }
}
