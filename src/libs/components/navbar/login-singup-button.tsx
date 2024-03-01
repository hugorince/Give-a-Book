import Link from "next/link";

interface LoginSignUpButtonProps {
  loginOrSignUp: "login" | "signup";
}

export const LoginSignUpButton = ({
  loginOrSignUp,
}: LoginSignUpButtonProps) => {
  return <Link href={`/${loginOrSignUp}`}>{loginOrSignUp}</Link>;
};
