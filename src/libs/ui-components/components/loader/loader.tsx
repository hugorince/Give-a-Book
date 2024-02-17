import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: "s" | "m" | "l";
}

export const Loader = ({ size = "m" }: LoaderProps) => {
  const classes = clsx("loader", `loader--${size}`);
  return <div className={classes} role="alert" aria-label="Loading"></div>;
};
