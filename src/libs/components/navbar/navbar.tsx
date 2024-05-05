"use user";

import { Avatar, Link } from "@/libs/ui-components";
import classes from "./navbar.module.css";
import NextLink from "next/link";
import { getInitials } from "@/libs/utils";
import { getUserNotifications, signOut } from "@/libs/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { SignOutButton } from "./sign-out-button";
import { Notifications } from "../notifications";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const initials = session && getInitials(session.user.username);
  const notifications = await getUserNotifications();

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {initials && (
            <li className={classes.avatar}>
              <NextLink href="/profile">
                <Avatar initials={initials} />
              </NextLink>
            </li>
          )}
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
                  My bookings
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
