"use client";

import type { User } from "@prisma/client";
import { useState } from "react";
import { UpdateProfileFieldContainer } from "../update-profile-field-container";
import { ProfileFieldContainer } from "../profile-field-container";
import classes from "./update-profile-info-container.module.css";
import clsx from "clsx";

interface ProfileInfoContainerProps {
  type: "email" | "username" | "postalCode";
  userInfos: User;
}

export const UpdateProfileInfoContainer = ({
  type,
  userInfos,
}: ProfileInfoContainerProps) => {
  const [updateInput, setUpdateInput] = useState("");

  if (!userInfos[type]) return null;

  const handleInputClose = () => {
    setUpdateInput("");
  };

  const fieldTitle = type
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .trim();

  return (
    <div className={classes.container}>
      <p
        className={clsx(updateInput === "" ? classes.fieldName : classes.hide)}
      >
        {fieldTitle}
      </p>
      {updateInput === type ? (
        <UpdateProfileFieldContainer
          handleInputClose={handleInputClose}
          updateInput={updateInput}
          userInfos={userInfos}
        />
      ) : (
        <ProfileFieldContainer
          fieldValue={userInfos[type]}
          handleOnClick={() => setUpdateInput(type)}
        />
      )}
    </div>
  );
};
