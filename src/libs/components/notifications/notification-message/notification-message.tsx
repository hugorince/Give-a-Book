import clsx from "clsx";
import classes from "./notification-message.module.css";
import { Link } from "@/libs/ui-components";
import type { NotificationProps } from "../notifications";

interface NotificationMessage {
  notification: NotificationProps;
  handleNotificationClicked: (id: number) => void;
}

export const NotificationMessage = ({
  notification,
  handleNotificationClicked,
}: NotificationMessage) => {
  const isMessageNotification = notification.type === "MESSAGE";
  const notificationContent = isMessageNotification
    ? `new message from ${notification.username}`
    : `new booking`;
  return (
    <li
      className={clsx(notification.isRead ? classes.isRead : classes.isNotRead)}
    >
      <Link
        href={
          isMessageNotification
            ? `/chat/${notification.bookingId}`
            : "/bookings"
        }
        variant="unstyled"
        onClick={() => handleNotificationClicked(notification.id)}
      >
        {notificationContent}
      </Link>
    </li>
  );
};
