"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/libs/types";
import * as z from "zod";
import classes from "./signup-form.module.css";
import { Button, InputText } from "@/libs/ui-components";
import { createUser, verifyPostalCode } from "@/libs/server";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const { handleSubmit, register, formState, setError } = useForm<
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
    const verifiedPostalCode = await verifyPostalCode(values.postalCode);
    if (verifiedPostalCode) {
      await createUser(values);
      router.push("/login");
    } else {
      setError("postalCode", {
        type: "custom",
        message: "invalid postal code",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.formWrapper}
      data-testid="signup-form"
    >
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
      {formState.errors.postalCode && (
        <p>{formState.errors.postalCode.message}</p>
      )}
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
