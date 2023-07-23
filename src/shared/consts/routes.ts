export const HOME_ROUTE = "/";
export const BROWSE_ROUTE = "/browse";

export const SIGN_IN_ROUTE = "/sign-in";
export const SIGN_UP_ROUTE = "/sign-up";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const SSO_CALLBACK_ROUTE = "/sso-callback";

export const GAMES_ROUTE = "/games";

export const SETTINGS_ROUTE = "/settings";
export const SETTINGS_PASSWORD_ROUTE = "/settings/password";

export const USERS_ROUTE = "/users";

export const PROFILE_ROUTE = (id: string) => `${USERS_ROUTE}/${id}}`;
export const LIBRARY_ROUTE = (id: string) => `${USERS_ROUTE}/${id}/library}`;
export const FRIENDS_ROUTE = (id: string) => `${USERS_ROUTE}/${id}/friends}`;

export const PUBLIC_ROUTES = [
  HOME_ROUTE,
  BROWSE_ROUTE,
  `${GAMES_ROUTE}/:path*`,
  `${USERS_ROUTE}/:path*`,
  FORGOT_PASSWORD_ROUTE,
  SSO_CALLBACK_ROUTE,
  "/api/webhooks/:path*",
  "/api/token",
  "/api/igdb/:path*",
  "/api/user/:path*",
];
