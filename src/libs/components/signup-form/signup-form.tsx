"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/libs/types";
import * as z from "zod";
import { useRouter } from "next/navigation";
import classes from "./signup-form.module.css";

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    if (response.ok) {
      router.push("/login");
    } else {
      console.error("Registration failed");
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={classes.formWrapper}
    >
      <input
        type="text"
        {...form.register("username")}
        placeholder="username"
      />
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
      <input
        type="password"
        {...form.register("confirmPassword")}
        placeholder="confirm password"
      />
      <button type="submit">submit</button>
    </form>
  );
};
