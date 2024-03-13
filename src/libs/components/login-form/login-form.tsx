"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginFormSchema } from "@/libs/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "./login-form.module.css";
import { Button, InputText } from "@/libs/ui-components";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    setIsLoading(true);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData.error, "error");
    } else {
      setTimeout(() => {
        router.push("/");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={classes.formWrapper}
      name="login form"
    >
      <InputText
        type="email"
        label="email"
        {...form.register("email")}
        placeholder="mail@mail.com"
      />
      <InputText
        type="password"
        label="password"
        {...form.register("password")}
        placeholder="password"
      />
      <Button
        type="submit"
        disabled={!form.formState.isValid}
        loading={isLoading}
      >
        log in
      </Button>
    </form>
  );
};
