import { SignUpForm } from "@/components";
import Link from "next/link";
import classes from "./signup-page.module.css";

const SignUp = () => {
  return (
    <main className={classes.pageWrapper}>
      <h1>Welcome to Give a Book</h1>
      <p>create your account</p>
      <SignUpForm />
      <Link href="/login">already have an account? log in!</Link>
    </main>
  );
};

export default SignUp;
