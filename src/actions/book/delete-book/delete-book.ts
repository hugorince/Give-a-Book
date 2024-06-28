"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export const deleteBook = async (bookId: number) => {
  try {
    await db.book.delete({
      where: { id: bookId },
    });
  } catch (err) {
    console.error(err);
  }
  redirect("/bookings");
};
