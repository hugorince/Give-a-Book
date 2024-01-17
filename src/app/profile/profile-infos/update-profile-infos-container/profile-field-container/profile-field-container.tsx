import { useSession } from "next-auth/react";
import classes from "./profile-field-container.module.css";

interface ProfileFieldContainerProps {
  handleOnClick: () => void;
  type: "email" | "username";
}

export const ProfileFieldContainer = ({
  handleOnClick,
  type,
}: ProfileFieldContainerProps) => {
  const { data: session } = useSession();
  return (
    <div className={classes.container}>
      <p>{session?.user[type]}</p>
      <button onClick={handleOnClick} className={classes.updateButton}>
        update
      </button>
    </div>
  );
};
