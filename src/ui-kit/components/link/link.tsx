import { type ReactNode, forwardRef } from "react";
import { clsx } from "clsx";
import { Loader } from "../loader";
import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps<HTMLAnchorElement> {
  size?: "s" | "m" | "l";
  variant?: "primary" | "unstyled";
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      size = "m",
      variant = "primary",
      fullWidth = false,
      loading = false,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = clsx("link", `link--${size}`, `link--${variant}`, {
      "link--full": fullWidth,
    });
    return (
      <NextLink className={clsx(classes, className)} ref={ref} {...props}>
        {loading ? <Loader size="s" /> : <>{children}</>}
      </NextLink>
    );
  },
);

Link.displayName = "Link";
