import { setNotificationVisibility } from "@/actions";
import { NotificationProps } from "../notifications";
import { NotificationMessage } from "../notification-message";
import classes from "./dropdown-notifications.module.css";

interface DropdownNotificationsProps {
  notifications: NotificationProps[];
}

export const DropdownNotifications = ({
  notifications,
}: DropdownNotificationsProps) => {
  const handleNotificationClicked = async (notificationId: number) => {
    await setNotificationVisibility(notificationId);
  };

  return (
    <ul className={classes.dropdownNotificationsContainer}>
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
