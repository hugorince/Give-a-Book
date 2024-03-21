"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/libs/types";
import * as z from "zod";
import classes from "./signup-form.module.css";
import { Button, InputText } from "@/libs/ui-components";
import { createUser } from "@/libs/utils";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof SignUpFormSchema>
  >({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      postalCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    await createUser(values);
    router.push("/login");
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
        type="postalCode"
        label="postal code"
        {...register("postalCode")}
        placeholder="75018"
      />
      <InputText
        type="password"
        label="password"
        {...register("password")}
        placeholder="password"
      />
      <InputText
        type="password"
        label="confirm password"
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
