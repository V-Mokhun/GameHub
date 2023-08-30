import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params;
    const { userId: authUserId } = auth();
    const body = await req.json();
    const { userId } = body;

    if (!userId || !authUserId || authUserId !== userId)
      return new NextResponse("Unauthorized", { status: 401 });

    const friends = await db.user.findMany({
      where: {
        friends: { some: { id: userId } },
        library: { some: { id: Number(gameId) } },
        isPrivateLibrary: false,
      },
      // take: 5,
      include: {
        library: {
          where: {
            id: Number(gameId),
          },
        },
      },
    });

    const friendsWithGame = friends.map((friend) => {
      const { notes, ...game } = friend.library[0];

      return {
        id: friend.id,
        username: friend.username,
        imageUrl: friend.imageUrl,
        game,
      };
    });

    return NextResponse.json(friendsWithGame, { status: 200 });
  } catch (error) {
    return catchError(
      error,
      "Could not get friends who have this game in library."
    );
  }
}
