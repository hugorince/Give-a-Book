import { LoginForm } from "./login-form/login-form";
import classes from "./login-page.module.css";

export const Login = () => {
  return (
    <main className={classes.pageWrapper}>
      <LoginForm />
    </main>
  );
};

export default Login;
