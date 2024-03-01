"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/libs/ui-components";

export const SignOutButton = () => {
  const handleOnClick = async () => {
    await signOut();
    redirect("/login");
  };
  return <Button onClick={handleOnClick}>sign out</Button>;
};
