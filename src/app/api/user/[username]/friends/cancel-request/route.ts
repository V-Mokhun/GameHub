import { auth } from "@clerk/nextjs";
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

    const { receiverUsername } = z
      .object({ receiverUsername: z.string() })
      .parse(body);

    await db.friendRequest.deleteMany({
      where: {
        OR: [
          { receiverUsername, senderUsername: username },
          { receiverUsername: username, senderUsername: receiverUsername },
        ],
      },
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    console.log(error);

    return catchError(error, "Failed to add a friend");
  }
}
