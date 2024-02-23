"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/libs/ui-components";

export const SignOutButton = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    await signOut();
    router.push("/login");
  };
  return <Button onClick={handleOnClick}>sign out</Button>;
};
