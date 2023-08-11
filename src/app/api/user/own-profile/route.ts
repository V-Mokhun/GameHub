import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: true,
        sentFriendRequests: true,
        receivedFriendRequests: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get own profile");
  }
}
