import { currentUser } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { username }: { username: string }) {
  try {
    const authUser = await currentUser();
    if (!authUser?.id) return new NextResponse("Unauthorized", { status: 401 });

    const [updatedUser] = await db.$transaction([
      db.user.update({
        where: { id: authUser.id },
        data: { friends: { connect: { username } } },
        include: { friends: true },
      }),
      db.user.update({
        where: {
          username,
        },
        data: {
          friends: {
            connect: {
              id: authUser.id,
            },
          },
        },
      }),
      db.friendRequest.delete({
        where: {
          senderUsername_receiverUsername: {
            senderUsername: username,
            receiverUsername: authUser.username!,
          },
        },
      }),
    ]);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to add a friend");
  }
}
