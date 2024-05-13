"use client";

import { Button } from "@/libs/ui-components";
import { useState } from "react";
import { DropdownNotifications } from "./dropdown-notifications";
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

  return (
    <div className={classes.notificationsContainer}>
      <Button onClick={handleOnClick} size="s">
        notifications
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
