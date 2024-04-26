"use client";

import { signOut } from "@/libs/utils";
import { Button, Link } from "@/libs/ui-components";

export const SignOutButton = () => {
  const handleOnClick = async () => {
    await signOut();
  };
  return (
    <Link href="/login" onClick={handleOnClick} size="s">
      sign out
    </Link>
  );
};
