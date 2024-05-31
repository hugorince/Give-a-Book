"use client";

import { signOut } from "@/libs/server";
import { Button } from "@/libs/ui-components";

export const SignOutButton = () => {
  return (
    <Button onClick={signOut} size="s">
      sign out
    </Button>
  );
};
