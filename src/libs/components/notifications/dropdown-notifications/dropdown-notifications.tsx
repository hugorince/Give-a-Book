import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useOutsideClick } from "@/libs/utils";
import { setNotificationVisibility } from "@/libs/database";
import { NotificationProps } from "../notifications";
import { NotificationMessage } from "../notification-message";
import classes from "./dropdown-notifications.module.css";

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
        <NotificationMessage
          key={key}
          notification={notification}
          handleNotificationClicked={handleNotificationClicked}
        />
      ))}
    </ul>
  );
};
