import { Avatar } from "@/libs/ui-components";
import classes from "./navbar.module.css";
import Link from "next/link";
import { getInitials } from "@/libs/utils";

export const Navbar = async () => {
  const initials = await getInitials();
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link href="/profile">
              <Avatar initials={initials} />
            </Link>
          </li>
          <li>
            <Link href="/books">books</Link>
          </li>
          <li>
            <Link href="/books/post-book">Add a book</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
