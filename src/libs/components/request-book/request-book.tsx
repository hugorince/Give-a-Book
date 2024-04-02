"use client";

import { Button, useDialog } from "@/libs/ui-components";
import { RequestBookDialog } from "./request-book-dialog";
import { BooksData, requestBook } from "@/libs/utils";
import { useRouter } from "next/navigation";

interface RequestBookProps {
  book: BooksData;
}

export const RequestBook = ({ book }: RequestBookProps) => {
  const { openDialog, closeDialog } = useDialog();
  const router = useRouter();

  const proceed = async () => {
    await requestBook(book);
    router.push("/books");
    closeDialog();
  };

  const handleOnClick = () => {
    openDialog({
      children: <RequestBookDialog proceed={proceed} />,
      onClose: () => console.log("fired"),
    });
  };

  return (
    <div>
      {book.requested && <p>this book has already been requested</p>}
      <Button onClick={handleOnClick} disabled={book.requested}>
        Request book
      </Button>
    </div>
  );
};
