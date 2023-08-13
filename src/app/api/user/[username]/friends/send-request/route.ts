import { auth } from "@clerk/nextjs";
import { pusherServer } from "@shared/config";
import { SEND_FRIEND_REQUEST } from "@shared/consts";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { username } = params;
    const body = await req.json();

    const { receiverUsername } = z
      .object({ receiverUsername: z.string() })
      .parse(body);

    const friendRequest = await db.friendRequest.create({
      data: {
        receiver: {
          connect: {
            username: receiverUsername,
          },
        },
        sender: {
          connect: {
            username,
          },
        },
      },
    });

    await pusherServer.trigger(receiverUsername, SEND_FRIEND_REQUEST, null);

    return NextResponse.json(friendRequest, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to add a friend");
  }
}
