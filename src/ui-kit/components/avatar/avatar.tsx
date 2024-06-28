import type { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  initials?: string;
}

export const Avatar = ({ src, initials, ...props }: AvatarProps) => {
  return (
    <figure className="avatar" role="presentation" {...props}>
      {src ? <img src={src} alt="" /> : ""}
      <figcaption>{initials}</figcaption>
    </figure>
  );
};

Avatar.displayName = "Avatar";
