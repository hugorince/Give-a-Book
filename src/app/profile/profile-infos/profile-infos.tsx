"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UpdateProfileInput } from "../update-profile/update-profile-form/update-profile-input/update-profile-input";

export const ProfileInfos = () => {
  const [updateInput, setUpdateInput] = useState({
    label: "",
    placeholder: "",
  });
  const { data: session, update } = useSession();

  const handleOnClick = () => {
    setUpdateInput({
      label: "username",
      placeholder: "username",
    });
  };

  return (
    <div>
      <h1>Welcome {session?.user.username}</h1>
      {updateInput.label === "username" ? (
        <div>
          <UpdateProfileInput type={updateInput} />
        </div>
      ) : (
        <div>
          <p>username: {session?.user.username}</p>
          <button onClick={handleOnClick}>update</button>
        </div>
      )}
      <div>
        <p>email: {session?.user.email}</p>
        <button>update</button>
      </div>
    </div>
  );
};
