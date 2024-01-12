"use client";

import { useFormContext } from "react-hook-form";

export interface UpdateProfileProps {
  type: {
    label: string;
    placeholder: string;
  };
}

export const UpdateProfileInput = ({ type }: UpdateProfileProps) => {
  const form = useFormContext();
  return (
    <input
      type={type.label}
      {...form.register(type.label)}
      placeholder={type.placeholder}
    />
  );
};
