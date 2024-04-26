import { SignUpForm } from "@/libs/components";
import classes from "./signup-page.module.css";
import Link from "next/link";

export const SignUp = () => {
  return (
    <main className={classes.pageWrapper}>
      <h1>Welcome to Give a Book</h1>
      <p>please sign up</p>
      <SignUpForm />
      <Link href="/login">already have an account? log in!</Link>
    </main>
  );
};

export default SignUp;
