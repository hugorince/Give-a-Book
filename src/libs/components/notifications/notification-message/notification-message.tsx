import clsx from "clsx";
import classes from "./notification-message.module.css";
import Link from "next/link";
import type { NotificationProps } from "../notifications";
import { CiCircleCheck } from "react-icons/ci";
import { timeSinceString } from "@/libs/utils";

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

  const timeSinceLabel = timeSinceString(notification.createdAt);

  return (
    <Link
      href={
        isMessageNotification ? `/chat/${notification.bookingId}` : "/bookings"
      }
      onClick={() => handleNotificationClicked(notification.id)}
      className={clsx(
        classes.notificationMessage,
        notification.isRead ? classes.isRead : classes.isNotRead,
      )}
    >
      <span className={classes.content}>
        {notificationContent}
        {notification.isRead && <CiCircleCheck size={36} color="green" />}
      </span>
      <span className={classes.date}>{timeSinceLabel}</span>
    </Link>
  );
};
