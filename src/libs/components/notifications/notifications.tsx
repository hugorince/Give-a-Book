"use client";

import { Button } from "@/libs/ui-components";
import { useEffect, useRef, useState } from "react";
import { DropdownNotifications } from "./dropdown-notifications";
import { IoMdNotificationsOutline } from "react-icons/io";
import classes from "./notifications.module.css";
import type { NotificationType } from "@prisma/client";
import { useOutsideClick } from "@/libs/utils";

export type NotificationProps = {
  id: number;
  bookingId: number;
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

  useEffect(() => {
    if (outsideClick) {
      setIsOpen(false);
    }
  }, [outsideClick, setIsOpen]);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const notificationsNumber = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <div className={classes.notificationsContainer} ref={containerRef}>
      <Button
        variant="unstyled"
        size="s"
        onClick={handleOnClick}
        className={classes.notificationsButton}
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
