import { auth, currentUser } from "@clerk/nextjs";
import { pusherServer } from "@shared/config";
import { REMOVE_FRIEND } from "@shared/consts";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const { username } = params;

    const body = await req.json();
    const { friendUsername } = z
      .object({ friendUsername: z.string() })
      .parse(body);

    const updatedUser = await db.$transaction([
      db.user.update({
        where: { id: userId },
        data: {
          friends: {
            disconnect: [{ username }, { username: friendUsername }],
          },
        },
        include: { friends: true },
      }),
      db.user.update({
        where: { username: friendUsername },
        data: {
          friends: {
            disconnect: [{ username }, { username: friendUsername }],
          },
        },
      }),
    ]);

    await pusherServer.trigger(friendUsername, REMOVE_FRIEND, {
      username: friendUsername,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to add a friend");
  }
}
