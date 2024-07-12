import classes from "./profile-field-container.module.css";

export interface ProfileFieldContainerProps {
  handleOnClick: () => void;
  fieldValue: string | null;
}

export const ProfileFieldContainer = ({
  handleOnClick,
  fieldValue,
}: ProfileFieldContainerProps) => {
  if (!fieldValue) return null;

  return (
    <div className={classes.container}>
      <p>{fieldValue}</p>
      <button onClick={handleOnClick} className={classes.updateButton}>
        update
      </button>
    </div>
  );
};
