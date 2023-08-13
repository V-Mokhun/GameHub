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

export const PROFILE_ROUTE = (username: string) => `${USERS_ROUTE}/${username}`;
export const LIBRARY_ROUTE = (username: string) =>
  `${USERS_ROUTE}/${username}/library`;
export const RATINGS_ROUTE = (username: string) =>
  `${USERS_ROUTE}/${username}/ratings`;
export const FRIENDS_ROUTE = (username: string) =>
  `${USERS_ROUTE}/${username}/friends`;
export const FRIENDS_RECEIVED_REQUESTS_ROUTE = (username: string) =>
  `${USERS_ROUTE}/${username}/friends/received`;
export const FRIENDS_SENT_REQUESTS_ROUTE = (username: string) =>
  `${USERS_ROUTE}/${username}/friends/sent`;

export const PRIVACY_ROUTE = "/privacy";
export const TERMS_ROUTE = "/terms";
export const ABOUT_ROUTE = "/about";
export const CONTACT_ROUTE = "/contact";

export const PUBLIC_ROUTES = [
  HOME_ROUTE,
  BROWSE_ROUTE,
  `${GAMES_ROUTE}/:path*`,
  `${USERS_ROUTE}/:path*`,
  FORGOT_PASSWORD_ROUTE,
  SSO_CALLBACK_ROUTE,
  PRIVACY_ROUTE,
  TERMS_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  "/api/webhooks/:path*",
  "/api/token",
  "/api/pusher/auth",
  "/api/igdb/:path*",
  "/api/user/:path*",
];
