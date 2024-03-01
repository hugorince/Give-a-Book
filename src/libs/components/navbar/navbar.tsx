import { Avatar } from "@/libs/ui-components";
import classes from "./navbar.module.css";
import Link from "next/link";
import { getInitials } from "@/libs/utils";
import { SignOutButton } from "./sign-out-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { LoginSignUpButton } from "./login-singup-button";

export const Navbar = async () => {
  const initials = await getInitials();
  const session = await getServerSession(authOptions);

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {session && (
            <li>
              <Link href="/profile">
                <Avatar initials={initials} />
              </Link>
            </li>
          )}
          <li>
            <Link href="/books">Books</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/books/post-book">Add book</Link>
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
