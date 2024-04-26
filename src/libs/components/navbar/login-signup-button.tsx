import { Link } from "@/libs/ui-components";

interface LoginSignUpButtonProps {
  loginOrSignUp: "login" | "signup";
}

export const LoginSignUpButton = ({
  loginOrSignUp,
}: LoginSignUpButtonProps) => {
  return (
    <Link href={`/${loginOrSignUp}`} size="s">
      {loginOrSignUp}
    </Link>
  );
};
