import type { Session } from "next-auth";

export const getInitials = (session: Session | null) => {
  return session?.user.username.charAt(0).toLocaleUpperCase();
};
