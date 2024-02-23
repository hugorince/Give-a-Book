import { LoginForm } from "@/libs/components";
import classes from "./login-page.module.css";
import Link from "next/link";

export const Login = () => {
  return (
    <main className={classes.pageWrapper}>
      <LoginForm />
      <Link href="/signup">not an account? sign up !</Link>
    </main>
  );
};

export default Login;
