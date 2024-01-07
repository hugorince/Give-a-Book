"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { UpdateProfileInput } from "../update-profile-input/update-profile-input";
import classes from "./profile.infos.module.css";

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
    resolver: zodResolver(userSchemaWithId),
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
        [updateInput.label]:
          values[`${updateInput.label}` as keyof typeof values],
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
      console.log("user updated, please re-login to see the effect");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <FormProvider {...form}>
      <h1>Welcome {session?.user.username}</h1>
      <h2>your information</h2>
      {updateInput.label === "username" ? (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <UpdateProfileInput type={updateInput} />
          <button type="submit">update</button>
          <button onClick={handleInputClose}>cancel</button>
        </form>
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <UpdateProfileInput type={updateInput} />
          <button>update</button>
          <button onClick={handleInputClose}>cancel</button>
        </form>
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
