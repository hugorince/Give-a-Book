import { SignUpForm } from "@/libs/components";
import Link from "next/link";
import classes from "./signup-page.module.css";

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
