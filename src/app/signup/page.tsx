import { SignUpForm } from "@/libs/components";
import classes from "./signup-page.module.css";

export const SignUp = () => {
  return (
    <main className={classes.pageWrapper}>
      <SignUpForm />
    </main>
  );
};

export default SignUp;
