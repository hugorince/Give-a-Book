import { type ComponentPropsWithoutRef } from "react";

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <div className="checkbox-container">
      <label htmlFor={label}>
        <input type="checkbox" id={label} {...props} />
        {label}
      </label>
    </div>
  );
};

Checkbox.displayName = "Checkbox";
