"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useSession } from "next-auth/react";
import { UpdateProfileInput } from "./update-profile-input/update-profile-input";

const userSchemaWithId = z.object({
  username: z.string().min(1, "Username is required").max(100).optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .optional(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters")
    .optional(),
});

export const UpdateProfileForm = (type: {
  label: string;
  placeholder: string;
}) => {
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof userSchemaWithId>>({
    resolver: zodResolver(userSchemaWithId),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchemaWithId>) => {
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
      }),
    });
    if (response.ok) {
      await update({
        ...session,
        user: {
          ...session?.user,
          [type.label]: values.type.label,
        },
      });
      console.log("user updated, please re-login to see the effect");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <UpdateProfileInput
          type={{ label: "username", placeholder: "username" }}
        />
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};
