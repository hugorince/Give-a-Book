"use server";

import { Link } from "@/ui-kit";
import { RiForbid2Line } from "react-icons/ri";
import classes from "./not-connected-request-book.module.css";

export const NotConnectedRequestBook = () => {
  return (
    <div className={classes.notConnectedRequestWrapper}>
      <RiForbid2Line size={64} color="red" />
      <p>You must be logged in to request a book</p>
      <div className={classes.linksContainer}>
        <Link href="/login">Log in</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
  return;
};
