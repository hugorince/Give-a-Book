"use client";

import { signOut } from "next-auth/react";
import classes from "./navbar.module.css";

export const SignOutButton = () => {
  return (
    <>
      <button onClick={() => signOut()} className={classes.signOutButton}>
        sign out
      </button>
    </>
  );
};
