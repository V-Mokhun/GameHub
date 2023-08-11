"use client";

import { useActiveChannel } from "@shared/lib/hooks";

interface ActiveStatusProps {}

export const ActiveStatus = ({}: ActiveStatusProps) => {
  useActiveChannel();

  return null;
};
