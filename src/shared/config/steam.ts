import SteamAuth from "node-steam-openid";

export const steam = new SteamAuth({
  realm: process.env.SITE_URL!, // Site name displayed to users on logon
  returnUrl: process.env.SITE_URL + "/import/callback", // Your return route
  apiKey: process.env.STEAM_API_KEY!, // Steam API key
});
