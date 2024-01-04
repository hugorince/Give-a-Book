"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginFormSchema } from "@/libs/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "./login-form.module.css";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData.error, "error");
    } else {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={classes.formWrapper}
    >
      <input
        type="email"
        {...form.register("email")}
        placeholder="mail@mail.com"
      />
      <input
        type="password"
        {...form.register("password")}
        placeholder="password"
      />
      <button type="submit">log in</button>
    </form>
  );
};
