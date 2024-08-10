"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/types";
import * as z from "zod";
import classes from "./signup-form.module.css";
import { Button, Checkbox, InputText } from "@/ui-kit";
import { createUser, verifyPostalCode } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      confidentiality: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    const verifiedPostalCode = await verifyPostalCode(values.postalCode);
    if (verifiedPostalCode) {
      try {
        await createUser(values);
        router.push("/login");
        toast.success("Your account has been successfully created");
      } catch (err) {
        toast.error("An error occurred");
      }
    } else {
      setError("postalCode", {
        type: "custom",
        message: "invalid postal code",
      });
      toast.error("This postal code is not correct");
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
        required
      />
      <InputText
        type="email"
        label="email"
        {...register("email")}
        placeholder="mail@mail.com"
        required
      />
      <InputText
        type="postalCode"
        label="postal code"
        {...register("postalCode")}
        placeholder="75018"
        required
      />
      {formState.errors.postalCode && (
        <p>{formState.errors.postalCode.message}</p>
      )}
      <InputText
        type="password"
        label="password"
        {...register("password")}
        placeholder="password"
        required
      />
      <InputText
        type="password"
        label="confirm password"
        {...register("confirmPassword")}
        placeholder="confirm password"
        required
      />
      <Checkbox
        label="I have agreed the confidentiality politics"
        link={{
          label: "confidentiality politics",
          href: "/confidentiality-politics",
        }}
        {...register("confidentiality")}
        required
      />
      <Button type="submit" loading={formState.isSubmitting}>
        submit
      </Button>
    </form>
  );
};
