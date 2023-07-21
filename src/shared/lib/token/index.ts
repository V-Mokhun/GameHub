import { Token } from "@shared/api";

let _token: Token;
let _lastUpdate = 0;

export async function getToken(): Promise<Token> {
  if (!_token || Date.now() - _lastUpdate > _token.expires_in) {
    const url = new URL(`${process.env.AUTH_BASE_URL}/token`);
    url.searchParams.set("client_id", process.env.API_CLIENT_ID || "");
    url.searchParams.set("client_secret", process.env.API_CLIENT_SECRET || "");
    url.searchParams.set("grant_type", "client_credentials");

    const response = await fetch(url, { method: "POST" });
    _token = (await response.json()) as Token;
    _lastUpdate = Date.now();
  }
  return _token;
}
