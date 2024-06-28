"use client";

import { useState } from "react";
import { UpdateProfileFieldContainer } from "../update-profile-field-container";
import { ProfileFieldContainer } from "../profile-field-container";
import classes from "./update-profile-info-container.module.css";

interface ProfileInfoContainerProps {
  type: "email" | "username";
}

export const UpdateProfileInfoContainer = ({
  type,
}: ProfileInfoContainerProps) => {
  const [updateInput, setUpdateInput] = useState("");

  const handleInputClose = () => {
    setUpdateInput("");
  };

  return (
    <div className={classes.container}>
      <p className={classes.fieldName}>{type}</p>
      {updateInput === type ? (
        <UpdateProfileFieldContainer
          handleInputClose={handleInputClose}
          updateInput={updateInput}
        />
      ) : (
        <ProfileFieldContainer
          type={type}
          handleOnClick={() => setUpdateInput(type)}
        />
      )}
    </div>
  );
};
