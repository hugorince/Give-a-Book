"use client";

import { Button, Link } from "@/libs/ui-components";
import { updateBookLikes } from "@/libs/utils";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useDialog } from "@/libs/ui-components";

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
  const { openDialog } = useDialog();

  const handleHeartClicked = async () => {
    if (isLoggedIn) {
      await updateBookLikes(bookId);
      router.refresh();
    } else {
      console.log("open clicked");

      openDialog({
        children: (
          <>
            <div>You must be logged in to like</div>
            <Link
              href={"/login"}
              variant="unstyled"
              onClick={() => {
                openDialog.onClose();
              }}
            >
              go to login
            </Link>
          </>
        ),
        onClose: () => console.log("fired"),
      });
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
