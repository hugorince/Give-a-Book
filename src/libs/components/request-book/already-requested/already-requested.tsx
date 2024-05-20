import { RiForbid2Line } from "react-icons/ri";
import classes from "./already-requested.module.css";
import { Link } from "@/libs/ui-components";

export const AlreadyRequested = () => {
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
