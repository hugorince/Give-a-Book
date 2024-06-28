import React, { type ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { Loader } from "../loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "s" | "m" | "l";
  variant?: "primary" | "secondary" | "unstyled";
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  label?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "m",
      variant = "primary",
      type = "button",
      disabled = false,
      fullWidth = false,
      loading = false,
      label,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = clsx("button", `button--${size}`, `button--${variant}`, {
      "button--full": fullWidth,
    });
    return (
      <button
        className={clsx(classes, className)}
        disabled={disabled}
        type={type}
        ref={ref}
        {...props}
        aria-label={label}
      >
        {loading ? <Loader size="s" /> : <span>{children}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
