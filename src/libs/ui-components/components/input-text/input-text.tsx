import React, {
  forwardRef,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from "react";
import clsx from "clsx";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldSize?: string;
  type?: HTMLInputTypeAttribute;
  label: string;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ fieldSize = "m", type = "text", label, ...props }, ref) => {
    const classes = clsx("input-text", `input-text--${fieldSize}`);
    return (
      <div>
        <label htmlFor={label} className="sr-only">
          {label}
        </label>
        <input
          name={label}
          id={label}
          type={type}
          ref={ref}
          className={classes}
          {...props}
        />
      </div>
    );
  },
);

InputText.displayName = "InputText";
