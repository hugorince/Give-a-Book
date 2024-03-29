"use client";

import { InputText } from "@/libs/ui-components";
import { useFormContext } from "react-hook-form";

export interface UpdateProfileProps {
  type: "email" | "username";
}

export const UpdateProfileInput = ({ type }: UpdateProfileProps) => {
  const { register } = useFormContext();
  return (
    <InputText
      label={type}
      type={type}
      {...register(type)}
      placeholder={type === "email" ? "mail@mail.com" : type}
    />
  );
};
