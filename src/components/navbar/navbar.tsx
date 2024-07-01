"use server";

import { Avatar, Link } from "@/ui-kit";
import NextLink from "next/link";
import { getInitials } from "@/utils";
import { getUserNotifications } from "@/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/actions/auth/auth";
import { SignOutButton } from "./sign-out-button";
import { Notifications } from "../notifications";
import classes from "./navbar.module.css";
import { Searchbar } from "../searchbar";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const initials = session && getInitials(session.user.username);
  const notifications = await getUserNotifications();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.listElements}>
          {initials && (
            <li className={classes.avatar}>
              <NextLink href="/profile">
                <Avatar initials={initials} />
              </NextLink>
            </li>
          )}
          <Searchbar />
          <li>
            <Link href="/books" variant="unstyled">
              Books
            </Link>
          </li>
          {initials ? (
            <>
              <li>
                <Link href="/books/post-book" variant="unstyled">
                  Add book
                </Link>
              </li>
              <li>
                <Link href="/bookings" variant="unstyled">
                  bookings
                </Link>
              </li>
              {notifications && <Notifications notifications={notifications} />}
              <li>
                <SignOutButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" size="s">
                  login
                </Link>
              </li>
              <li>
                <Link href="/signup" size="s">
                  sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
