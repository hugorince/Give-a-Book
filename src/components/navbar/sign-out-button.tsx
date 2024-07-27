"use client";

import { signOut } from "@/utils";
import { Button } from "@/ui-kit";

export const SignOutButton = () => {
  return (
    <Button onClick={signOut} size="s">
      sign out
    </Button>
  );
};
