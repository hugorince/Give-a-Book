"use client";

import { useFormContext } from "react-hook-form";

export interface UpdateProfileProps {
  type: "email" | "username";
}

export const UpdateProfileInput = ({ type }: UpdateProfileProps) => {
  const form = useFormContext();
  return (
    <input
      type={type}
      {...form.register(type)}
      placeholder={type === "email" ? "mail@mail.com" : type}
    />
  );
};
