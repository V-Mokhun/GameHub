import { currentUser } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { username }: { username: string }) {
  try {
    const authUser = await currentUser();
    if (!authUser?.id) return new NextResponse("Unauthorized", { status: 401 });

    await db.friendRequest.create({
      data: {
        receiver: {
          connect: {
            username,
          },
        },
        sender: {
          connect: {
            username: authUser.username!,
          },
        },
      },
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to add a friend");
  }
}
