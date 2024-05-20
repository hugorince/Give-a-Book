"use client";

import { useState } from "react";
import { Button, Link } from "@/libs/ui-components";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useDialog } from "@/libs/ui-components";
import { updateBookLikes } from "@/libs/database";
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

  const showLikesNumber = likesNumberState > 0;

  const updateLikesStates = () => {
    const newLikesNumber = isLikedState
      ? likesNumberState - 1
      : likesNumberState + 1;
    setLikesNumberState(newLikesNumber);
    setIsLikedState(!isLikedState);
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
            <Link href={"/login"} variant="unstyled" onClick={closeDialog}>
              go to login
            </Link>
          </div>
        ),
        onClose: () => console.log("fired"),
      });
    }
  };

  return (
    <>
      {isLikedState ? (
        <div className={classes.likesWrapper}>
          <p>{likesNumberState}</p>
          <Button variant="unstyled" onClick={handleHeartClicked}>
            <IoHeart size={24} data-testid="liked-button" />
          </Button>
        </div>
      ) : (
        <div className={classes.likesWrapper}>
          {showLikesNumber && <p>{likesNumberState}</p>}
          <Button variant="unstyled" onClick={handleHeartClicked}>
            <IoMdHeartEmpty size={24} data-testid="not-liked-button" />
          </Button>
        </div>
      )}
    </>
  );
};
