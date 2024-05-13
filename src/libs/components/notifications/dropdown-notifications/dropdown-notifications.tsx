import { Notification } from "@prisma/client";
import classes from "./dropdown-notifications.module.css";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useOutsideClick } from "@/libs/utils";
import { Link } from "@/libs/ui-components";
import clsx from "clsx";
import { setNotificationVisibility } from "@/libs/database";
import { NotificationProps } from "../notifications";

interface DropdownNotificationsProps {
  notifications: NotificationProps[];
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

  const handleNotificationClicked = async (notificationId: number) => {
    await setNotificationVisibility(notificationId);
  };

  return (
    <ul className={classes.dropdownNotificationsContainer} ref={wrapperRef}>
      {notifications.map((notification, key) => (
        <li
          key={key}
          className={clsx(
            notification.isRead ? classes.isRead : classes.isNotRead,
          )}
        >
          <Link
            href={`/chat/${notification.bookingId}`}
            variant="unstyled"
            onClick={() => handleNotificationClicked(notification.id)}
          >
            new message from {notification.username}
          </Link>
        </li>
      ))}
    </ul>
  );
};
