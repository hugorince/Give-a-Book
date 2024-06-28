import type { NotificationProps } from "../notifications";
import clsx from "clsx";
import Link from "next/link";
import { timeSinceString } from "@/utils";
import classes from "./notification-message.module.css";

interface NotificationMessage {
  notification: NotificationProps;
  handleNotificationClicked: (id: number) => void;
}

export const NotificationMessage = ({
  notification,
  handleNotificationClicked,
}: NotificationMessage) => {
  const isMessageNotification = notification.type === "MESSAGE";
  const isPropositionNotification = notification.type === "PROPOSITION";
  const notificationContent = isMessageNotification
    ? `New message from ${notification.username}`
    : isPropositionNotification
      ? `New proposition received`
      : `New booking`;

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
      <span className={classes.content}>{notificationContent}</span>
      <span className={classes.date}>{timeSinceLabel}</span>
    </Link>
  );
};
