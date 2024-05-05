"use client";

import { signOut } from "@/libs/database";
import { Button } from "@/libs/ui-components";

export const SignOutButton = () => {
  return (
    <Button onClick={signOut} size="s">
      sign out
    </Button>
  );
};
