"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { authOptions } from "@/libs/auth/auth";

const userSchemaWithId = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export const UpdateProfileForm = () => {
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
      console.log("user updated, please re-login to see the effect");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
      <button type="submit">submit</button>
    </form>
  );
};
