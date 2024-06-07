"use client;";

import type { Book } from "@prisma/client";
import { Button, useDialog } from "@/libs/ui-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classes from "./propose-exchange-dialog.module.css";

interface ProposeExchangeDialogProps {
  proceed: (bookId: number) => void;
  connectedUserBooks: Book[];
}

const proposeBookSchema = z.object({
  bookId: z.number().optional(),
});

export const ProposeExchangeDialog = ({
  proceed,
  connectedUserBooks,
}: ProposeExchangeDialogProps) => {
  const { closeDialog } = useDialog();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(proposeBookSchema),
  });

  const onSubmit = (values: z.infer<typeof proposeBookSchema>) => {
    if (values.bookId) proceed(values.bookId);
  };

  console.log(connectedUserBooks);
  return (
    <form className={classes.dialogContainer} onSubmit={handleSubmit(onSubmit)}>
      <label>select a book you propose in exchange</label>
      <select
        {...register("bookId", {
          valueAsNumber: true,
        })}
      >
        {connectedUserBooks.map((book, key) => (
          <option key={key} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>
      <div className={classes.actionButtons}>
        <Button type="button" variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit">Propose this book</Button>
      </div>
    </form>
  );
};
