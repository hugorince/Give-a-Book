"use client";

import { Button } from "@/libs/ui-components";
import { updateBookLikes } from "@/libs/utils";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useRouter } from "next/navigation";

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

  const handleHeartClicked = async () => {
    if (isLoggedIn) {
      await updateBookLikes(bookId);
      router.refresh();
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      {isLiked ? (
        <Button variant="unstyled" onClick={handleHeartClicked}>
          <IoHeart size={24} />
        </Button>
      ) : (
        <Button variant="unstyled" onClick={handleHeartClicked}>
          <IoMdHeartEmpty size={24} />
        </Button>
      )}
    </>
  );
};
