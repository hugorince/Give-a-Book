"use client";

import { useFormContext } from "react-hook-form";
import classes from "./select-input.module.css";

export const SelectInput = () => {
  const { register } = useFormContext();
  return (
    <select id="" {...register("exchangeGive")} className={classes.select}>
      <option value="give">Give</option>
      <option value="exchange">Exchange</option>
    </select>
  );
};
