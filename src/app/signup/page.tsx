import { SignUpForm } from "./signup-form/signup-form";
import classes from "./signup-page.module.css";

export const SignUp = () => {
  return (
    <main className={classes.pageWrapper}>
      <SignUpForm />
    </main>
  );
};

export default SignUp;
