"use client";
import { useFormContext } from "react-hook-form";

export const SelectInput = () => {
  const { register } = useFormContext();
  return (
    <select id="" {...register("exchangegive")}>
      <option value="give">give</option>
      <option value="exchange">exchange</option>
    </select>
  );
};
