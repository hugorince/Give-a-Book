"use server";

import { Avatar, Link } from "@/libs/ui-components";
import classes from "./navbar.module.css";
import NextLink from "next/link";
import { getInitials } from "@/libs/utils";
import { SignOutButton } from "./sign-out-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { LoginSignUpButton } from "./login-signup-button";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const initials = await getInitials();

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {session && (
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
          {session ? (
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
                <SignOutButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <LoginSignUpButton loginOrSignUp="login" />
              </li>
              <li>
                <LoginSignUpButton loginOrSignUp="signup" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
