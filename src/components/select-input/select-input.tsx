"use client";

import { useFormContext } from "react-hook-form";
import classes from "./select-input.module.css";
import { BOOK_TYPE } from "@/constants";

export const SelectInput = () => {
  const { register } = useFormContext();
  return (
    <select id="" {...register("exchangeGive")} className={classes.select}>
      <option value={BOOK_TYPE.GIVE}>Give</option>
      <option value={BOOK_TYPE.EXCHANGE}>Exchange</option>
    </select>
  );
};
