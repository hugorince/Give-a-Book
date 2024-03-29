import { clsx } from "clsx";

interface ChipProps {
  size?: "s" | "m" | "l";
  variant?: "primary" | "requested" | "unstyled";
  label: string;
  exchange?: boolean;
}

export const Chip = ({
  label,
  size = "m",
  variant = "primary",
  exchange = false,
}: ChipProps) => {
  const exchangeClass = exchange ? "exchange" : "give";

  const classes = clsx(
    "chip",
    `chip--${size}`,
    `chip--${variant}`,
    `chip--${exchangeClass}`,
  );

  return (
    <div id={label} className={classes}>
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
