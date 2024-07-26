"use client";

import { useFormContext } from "react-hook-form";
import classes from "./select-input.module.css";
import { BOOKTYPE } from "@/constants";

export const SelectInput = () => {
  const { register } = useFormContext();
  return (
    <select id="" {...register("exchangeGive")} className={classes.select}>
      <option value={BOOKTYPE.GIVE}>Give</option>
      <option value={BOOKTYPE.EXCHANGE}>Exchange</option>
    </select>
  );
};
