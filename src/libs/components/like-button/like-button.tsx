"use client";

import { useEffect, useState } from "react";
import { updateBookLikes } from "@/libs/server-actions";
import { Button, Link, useDialog } from "@/libs/ui-components";
import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import classes from "./like-button.module.css";

interface LikeButtonProps {
  bookId: number;
  isLiked: boolean;
  isLoggedIn: boolean;
  likesNumber: number;
}

export const LikeButton = ({
  bookId,
  isLiked,
  isLoggedIn,
  likesNumber,
}: LikeButtonProps) => {
  const { openDialog, closeDialog } = useDialog();
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likesNumberState, setLikesNumberState] = useState(likesNumber);

  const updateLikesStates = () => {
    setLikesNumberState((prev) => (isLikedState ? prev - 1 : prev + 1));
    setIsLikedState((prev) => !prev);
  };

  const handleHeartClicked = async () => {
    if (isLoggedIn) {
      await updateBookLikes(bookId);
      updateLikesStates();
    } else {
      openDialog({
        children: (
          <div className={classes.dialogContent}>
            <div>You must be logged in to like</div>
            <Link href="/login" variant="unstyled" onClick={closeDialog}>
              go to login
            </Link>
          </div>
        ),
        onClose: () => console.log("Dialog closed"),
      });
    }
  };

  useEffect(() => {
    setIsLikedState(isLiked);
    setLikesNumberState(likesNumber);
  }, [isLiked, likesNumber]);

  return (
    <div className={classes.likesWrapper}>
      {likesNumberState > 0 && <p>{likesNumberState}</p>}
      <Button variant="unstyled" onClick={handleHeartClicked}>
        {isLikedState ? (
          <IoHeart size={24} data-testid="liked-button" />
        ) : (
          <IoMdHeartEmpty size={24} data-testid="not-liked-button" />
        )}
      </Button>
    </div>
  );
};
