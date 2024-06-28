"use client";

import { signOut } from "@/actions";
import { Button } from "@/ui-kit";

export const SignOutButton = () => {
  return (
    <Button onClick={signOut} size="s">
      sign out
    </Button>
  );
};
