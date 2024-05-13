"use client";

import { Button } from "@/libs/ui-components";
import { useState } from "react";
import { DropdownNotifications } from "./dropdown-notifications";
import { IoMdNotificationsOutline } from "react-icons/io";
import classes from "./notifications.module.css";

export interface NotificationProps {
  id: number;
  username: string;
  bookingId: number;
  isRead: boolean;
}
interface NotificationsProps {
  notifications: NotificationProps[];
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const notificationNonReadNumber = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <div className={classes.notificationsContainer}>
      <Button
        variant="unstyled"
        size="s"
        onClick={handleOnClick}
        className={classes.notificationsButton}
      >
        <IoMdNotificationsOutline size={24} />
        {notificationNonReadNumber > 0 && (
          <div>{notificationNonReadNumber}</div>
        )}
      </Button>
      {isOpen && (
        <DropdownNotifications
          notifications={notifications}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
