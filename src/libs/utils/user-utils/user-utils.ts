import { signOut as nextAuthSignOut } from "next-auth/react";
import { redirect } from "next/navigation";

export const signOut = async () => {
  await nextAuthSignOut();
  redirect("/login");
};
