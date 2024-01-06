"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { UpdateProfileInput } from "../update-profile/update-profile-form/update-profile-input/update-profile-input";

export const ProfileInfos = () => {
  const [updateInput, setUpdateInput] = useState({
    label: "",
    placeholder: "",
  });

  const { data: session, update } = useSession();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const handleOnClick = () => {
    setUpdateInput({
      label: "username",
      placeholder: "username",
    });
  };

  const handleOnClickEmail = () => {
    setUpdateInput({
      label: "email",
      placeholder: "mail@mail.com",
    });
  };

  const handleInputClose = () => {
    setUpdateInput({
      label: "",
      placeholder: "",
    });
  };

  const onSubmit = async (values: any) => {
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user.email,
        [updateInput.label]: values[`${updateInput.label}`],
      }),
    });
    if (response.ok) {
      await update({
        ...session,
        user: {
          ...session?.user,
          [updateInput.label]: values[`${updateInput.label}`],
        },
      });
      console.log("user updated, please re-login to see the effect");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <FormProvider {...form}>
      <h1>Welcome {session?.user.username}</h1>
      {updateInput.label === "username" ? (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <UpdateProfileInput type={updateInput} />
          <button type="submit">update</button>
          <button onClick={handleInputClose}>cancel</button>
        </form>
      ) : (
        <div>
          <p>username: {session?.user.username}</p>
          <button onClick={handleOnClick}>update</button>
        </div>
      )}
      {updateInput.label === "email" ? (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <UpdateProfileInput type={updateInput} />
          <button>update</button>
          <button onClick={handleInputClose}>cancel</button>
        </form>
      ) : (
        <div>
          <p>email: {session?.user.email}</p>
          <button onClick={handleOnClickEmail}>update</button>
        </div>
      )}
    </FormProvider>
  );
};
