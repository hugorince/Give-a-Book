import { Notification } from "@prisma/client";
import classes from "./dropdown-notifications.module.css";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useOutsideClick } from "@/libs/utils";

interface DropdownNotificationsProps {
  notifications: Notification[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DropdownNotifications = ({
  notifications,
  setIsOpen,
}: DropdownNotificationsProps) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const { outsideClick } = useOutsideClick({ ref: wrapperRef });

  useEffect(() => {
    if (outsideClick) setIsOpen(false);
  }, [outsideClick, setIsOpen]);

  return (
    <ul className={classes.dropdownNotificationsContainer} ref={wrapperRef}>
      {notifications.map((notification, key) => (
        <li key={key}>{notification.type}</li>
      ))}
    </ul>
  );
};
