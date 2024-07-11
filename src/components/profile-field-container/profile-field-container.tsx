import classes from "./profile-field-container.module.css";

export interface ProfileFieldContainerProps {
  handleOnClick: () => void;
  fieldValue: string;
}

export const ProfileFieldContainer = ({
  handleOnClick,
  fieldValue,
}: ProfileFieldContainerProps) => {
  return (
    <div className={classes.container}>
      <p>{fieldValue}</p>
      <button onClick={handleOnClick} className={classes.updateButton}>
        update
      </button>
    </div>
  );
};
