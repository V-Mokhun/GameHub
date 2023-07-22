export function getCookie(cookieName: string) {
  if (typeof window === "undefined") return "";

  const cookie: { [key: string]: string } = {};

  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });

  return cookie[cookieName];
}
