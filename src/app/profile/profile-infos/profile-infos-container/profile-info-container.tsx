"use client";

import { useState } from "react";
import { UpdateProfileFieldContainer } from "../update-profile-field-container";
import { ProfileFieldContainer } from "../profile-field-container";

interface ProfileInfoContainerProps {
  type: "email" | "username";
}

export const ProfileInfoContainer = ({ type }: ProfileInfoContainerProps) => {
  const [updateInput, setUpdateInput] = useState("");

  const handleInputClose = () => {
    setUpdateInput("");
  };

  return (
    <>
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
    </>
  );
};
