"use client";

import type { User } from "@prisma/client";
import { Button, useDialog } from "@/ui-kit";
import { capitalize, memberSince } from "@/utils";
import { UpdateProfileInfoContainer } from "../update-profile-infos-container";
import { DialogBox } from "../dialog-box";
import { deleteUser } from "@/actions/user/delete-user/delete-user";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import classes from "./profile.infos.module.css";

interface ProfileInfosProps {
  userInfos: User;
}

export const ProfileInfos = ({ userInfos }: ProfileInfosProps) => {
  const memberSinceDate = memberSince(userInfos.createdAt);
  const capitalizeUsername =
    userInfos.username && capitalize(userInfos.username);

  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const handleDeleteBook = async () => {
    signOut();
    await deleteUser(userInfos.id);
    closeDialog();
    router.push("/books");
  };

  const openCancelDeleteAccountDialog = () => {
    openDialog({
      children: (
        <DialogBox
          cta={handleDeleteBook}
          label="are you sure you want to permanently delete your account?"
        />
      ),
    });
  };

  return (
    <div className={classes.wrapper}>
      <h1>Welcome {capitalizeUsername}</h1>
      <p>member since {memberSinceDate}</p>
      <div className={classes.updateFields}>
        <UpdateProfileInfoContainer userInfos={userInfos} type="username" />
        <UpdateProfileInfoContainer userInfos={userInfos} type="email" />
        <UpdateProfileInfoContainer userInfos={userInfos} type="postalCode" />
      </div>
      <Button onClick={openCancelDeleteAccountDialog} size="s">
        Delete account
      </Button>
    </div>
  );
};
