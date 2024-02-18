"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/libs/types";
import * as z from "zod";
import { useRouter } from "next/navigation";
import classes from "./signup-form.module.css";
import { Button, InputText } from "@/libs/ui-components";

export const SignUpForm = () => {
  const router = useRouter();
  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof SignUpFormSchema>
  >({
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
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
      <InputText
        type="text"
        label="username"
        {...register("username")}
        name="username"
        placeholder="username"
      />
      <InputText
        type="email"
        label="email"
        {...register("email")}
        placeholder="mail@mail.com"
      />
      <InputText
        type="password"
        label="password"
        {...register("password")}
        placeholder="password"
      />
      <InputText
        type="password"
        label="password"
        {...register("confirmPassword")}
        placeholder="confirm password"
      />
      <Button
        type="submit"
        loading={formState.isSubmitting}
        disabled={!formState.isValid}
      >
        submit
      </Button>
    </form>
  );
};
