"use client";

import type { NotificationType } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/utils";
import { Button } from "@/ui-kit";
import { DropdownNotifications } from "./dropdown-notifications";
import { IoMdNotificationsOutline } from "react-icons/io";
import classes from "./notifications.module.css";

export type NotificationProps = {
  id: number;
  bookingId: number | null;
  isRead: boolean;
  type: NotificationType;
  username?: string | null;
  createdAt: Date;
};
interface NotificationsProps {
  notifications: NotificationProps[];
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { outsideClick } = useOutsideClick({
    refs: [dropdownRef, containerRef],
  });

  const notificationsNumber = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (outsideClick) {
      setIsOpen(false);
    }
  }, [outsideClick, setIsOpen]);

  return (
    <div className={classes.notificationsContainer} ref={containerRef}>
      <Button
        variant="unstyled"
        size="s"
        onClick={handleOnClick}
        className={classes.notificationsButton}
        label="notifications"
      >
        <IoMdNotificationsOutline size={24} />
        {notificationsNumber > 0 && <div>{notificationsNumber}</div>}
      </Button>
      {isOpen && (
        <div ref={dropdownRef}>
          <DropdownNotifications notifications={notifications} />
        </div>
      )}
    </div>
  );
};
