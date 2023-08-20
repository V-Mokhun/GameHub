import { Token } from "@shared/api";
import { COOKIE_TOKEN_NAME } from "@shared/consts";
import { catchError } from "@shared/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const url = new URL(`${process.env.AUTH_BASE_URL}/token`);

    url.searchParams.set(
      "client_id",
      process.env.NEXT_PUBLIC_API_CLIENT_ID || ""
    );
    url.searchParams.set("client_secret", process.env.API_CLIENT_SECRET || "");
    url.searchParams.set("grant_type", "client_credentials");

    const res = await fetch(url, { method: "POST" });
    const token = (await res.json()) as Token;

    const response = NextResponse.json(token.access_token, { status: 200 });

    response.cookies.set({
      name: COOKIE_TOKEN_NAME,
      value: token.access_token,
      httpOnly: false,
      maxAge: token.expires_in,
    });

    return response;
  } catch (error) {
    return catchError(error, "Failed to get token");
  }
}
