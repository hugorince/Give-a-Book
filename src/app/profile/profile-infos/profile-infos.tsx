"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { UpdateProfileInput } from "../update-profile-field-container/update-profile-input/update-profile-input";
import classes from "./profile.infos.module.css";
import { UpdateProfileFieldContainer } from "../update-profile-field-container";

const userSchemaWithId = z.object({
  username: z.string().min(1, "Username is required").max(100).optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .optional(),
});

export const ProfileInfos = () => {
  const [updateInput, setUpdateInput] = useState({
    label: "",
    placeholder: "",
  });

  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof userSchemaWithId>>({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const handleOnClickUsername = () => {
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

  const onSubmit = async (values: z.infer<typeof userSchemaWithId>) => {
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionEmail: session?.user.email,
        [updateInput.label]: values[updateInput.label as keyof typeof values],
      }),
    });

    if (response.ok) {
      await update({
        ...session,
        user: {
          ...session?.user,
          [updateInput.label]: values[updateInput.label as keyof typeof values],
        },
      });
      console.log("user's", updateInput.label, " updated");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <FormProvider {...form}>
      <h1>Welcome {session?.user.username}</h1>
      <h2>your information</h2>
      {updateInput.label === "username" ? (
        <UpdateProfileFieldContainer
          submitForm={form.handleSubmit(onSubmit)}
          handleInputClose={handleInputClose}
          updateInput={updateInput}
        />
      ) : (
        <div>
          <p>username: {session?.user.username}</p>
          <button
            onClick={handleOnClickUsername}
            className={classes.updateButton}
          >
            update
          </button>
        </div>
      )}
      {updateInput.label === "email" ? (
        <UpdateProfileFieldContainer
          submitForm={form.handleSubmit(onSubmit)}
          handleInputClose={handleInputClose}
          updateInput={updateInput}
        />
      ) : (
        <div>
          <p>email: {session?.user.email}</p>
          <button onClick={handleOnClickEmail} className={classes.updateButton}>
            update
          </button>
        </div>
      )}
    </FormProvider>
  );
};
