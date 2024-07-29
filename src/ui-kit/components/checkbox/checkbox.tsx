import { forwardRef, type ComponentPropsWithRef } from "react";

interface CheckboxProps extends ComponentPropsWithRef<"input"> {
  label: string;
  link?: {
    label: string;
    href: string;
  };
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, link, ...props }, ref) => {
    return (
      <div className="checkbox-container">
        <label htmlFor={label}>
          <input type="checkbox" id={label} {...props} ref={ref} />
          {label}
        </label>
        {link && <a href={link.href}>{link.label}</a>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
