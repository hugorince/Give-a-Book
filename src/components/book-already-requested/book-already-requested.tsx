"use server";

import { RiForbid2Line } from "react-icons/ri";
import classes from "./book-already-requested.module.css";
import { Link } from "@/ui-kit";

export const BookAlreadyRequested = () => {
  return (
    <div className={classes.alreadyRequestedWrapper}>
      <RiForbid2Line size={64} color="red" />
      <p>This book as already been requested</p>
      <Link href="/books" variant="unstyled">
        continue browsing books
      </Link>
    </div>
  );
};
