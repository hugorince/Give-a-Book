import type { Session } from "next-auth";

export const getInitials = (username: string) => {
  return username.charAt(0).toLocaleUpperCase();
};
