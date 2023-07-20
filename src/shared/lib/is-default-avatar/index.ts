"use client";

import { isomorphicAtob } from "@clerk/shared";

interface EncodedImageData {
  type: "default" | "proxy";
  iid?: string;
  rid?: string;
  src?: string;
  initials?: string;
}

export const isDefaultAvatar = (url: string) => {
  if (
    (url || "").includes("gravatar") ||
    (url || "").includes("avatar_placeholder")
  ) {
    return true;
  }

  try {
    const encoded = new URL(url).pathname.replace("/", "");
    const decoded = isomorphicAtob(encoded);
    const obj = JSON.parse(decoded) as EncodedImageData;
    return obj.type === "default";
  } catch {
    return false;
  }
};
