import { clsx } from "clsx";

interface ChipProps {
  size?: "s" | "m" | "l";
  variant?:
    | "primary"
    | "unstyled"
    | "success"
    | "error"
    | "pending"
    | "info"
    | "info-2";
  label: string;
}

export const Chip = ({ label, size = "m", variant = "primary" }: ChipProps) => {
  const classes = clsx("chip", `chip--${size}`, `chip--${variant}`);

  return (
    <div id={label} className={classes}>
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
