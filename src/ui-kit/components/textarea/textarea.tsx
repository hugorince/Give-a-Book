import React, { forwardRef, type TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldSize?: string;
  label: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ fieldSize = "m", label, ...props }, ref) => {
    const classes = clsx("textarea", `textarea--${fieldSize}`);
    return (
      <div>
        <label htmlFor={label} className="sr-only">
          {label}
        </label>
        <textarea id={label} ref={ref} className={classes} {...props} />
      </div>
    );
  },
);

Textarea.displayName = "TextArea";
