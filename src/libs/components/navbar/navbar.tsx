"use client";

import { Avatar, Button, Link } from "@/libs/ui-components";
import classes from "./navbar.module.css";
import NextLink from "next/link";
import { getInitials } from "@/libs/utils";
import { useSession } from "next-auth/react";
import { signOut } from "@/libs/database";

export const Navbar = () => {
  const session = useSession();
  const initials = session && getInitials(session.data);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {session.data && (
            <li>
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
          {session.data ? (
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
              <li>
                <Button onClick={handleSignOut} size="s">
                  sign out
                </Button>
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
