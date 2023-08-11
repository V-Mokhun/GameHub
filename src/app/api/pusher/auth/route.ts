import { auth } from "@clerk/nextjs";
import { pusherServer } from "@shared/config";
import { NextResponse } from "next/server";

async function handler(request: Request) {
  const { userId } = auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const body = await request.text();
  const [socketId, channel] = body.split("&").map((x) => x.split("=")[1]);

  const data = {
    user_id: userId,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return NextResponse.json(authResponse);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
