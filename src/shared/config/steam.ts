import SteamAuth from "node-steam-openid";

export const steam = new SteamAuth({
  realm: "http://localhost:3000", // Site name displayed to users on logon
  returnUrl: "http://localhost:3000/api/steam/authenticate", // Your return route
  apiKey: process.env.STEAM_API_KEY!, // Steam API key
});
