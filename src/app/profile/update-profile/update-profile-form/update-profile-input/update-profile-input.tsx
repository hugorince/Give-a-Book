"use client";

import { useFormContext } from "react-hook-form";
import * as z from "zod";

interface UpdateProfileProps {
  type: {
    label: "username" | "email" | "password";
    placeholder: string;
  };
}

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

export const UpdateProfileInput = ({ type }: UpdateProfileProps) => {
  const form = useFormContext<z.infer<typeof userSchemaWithId>>();
  return (
    <input
      type={type.label}
      {...form.register(type.label)}
      placeholder={type.placeholder}
    />
  );
};
