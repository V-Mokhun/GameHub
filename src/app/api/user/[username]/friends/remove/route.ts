import { currentUser } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const authUser = await currentUser();
    if (!authUser?.id) return new NextResponse("Unauthorized", { status: 401 });
    const { username } = params;

    const updatedUser = await db.user.update({
      where: { id: authUser.id },
      data: {
        friends: {
          disconnect: [{ username: authUser.username! }, { username }],
        },
      },
      include: { friends: true },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to add a friend");
  }
}
