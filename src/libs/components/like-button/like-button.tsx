"use client";

import { Button, Link } from "@/libs/ui-components";
import { updateBookLikes } from "@/libs/database";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useDialog } from "@/libs/ui-components";
import classes from "./like-button.module.css";

interface LikeButtonProps {
  bookId: number;
  isLiked: boolean;
  isLoggedIn: boolean;
}

export const LikeButton = ({
  bookId,
  isLiked,
  isLoggedIn,
}: LikeButtonProps) => {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  const handleHeartClicked = async () => {
    if (isLoggedIn) {
      await updateBookLikes(bookId);
      router.refresh();
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
      {isLiked ? (
        <Button variant="unstyled" onClick={handleHeartClicked}>
          <IoHeart size={24} data-testid="liked-button" />
        </Button>
      ) : (
        <Button variant="unstyled" onClick={handleHeartClicked}>
          <IoMdHeartEmpty size={24} data-testid="not-liked-button" />
        </Button>
      )}
    </>
  );
};
