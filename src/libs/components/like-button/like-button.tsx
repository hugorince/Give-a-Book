"use client";

import { Button } from "@/libs/ui-components";
import { updateBookLikes } from "@/libs/utils";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

interface LikeButtonProps {
  bookId: number;
  isLiked: boolean;
}

export const LikeButton = ({ bookId, isLiked }: LikeButtonProps) => {
  const handleHeartClicked = async () => {
    await updateBookLikes(bookId);
  };

  return (
    <>
      {isLiked ? (
        <Button variant="unstyled" onClick={handleHeartClicked}>
          <IoHeart />
        </Button>
      ) : (
        <Button variant="unstyled" onClick={handleHeartClicked}>
          <IoMdHeartEmpty />
        </Button>
      )}
    </>
  );
};
