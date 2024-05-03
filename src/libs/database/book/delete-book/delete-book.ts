"use server";

import type { BookData } from "@/libs/types";
import db from "../../db";
import { redirect } from "next/navigation";

export const deleteBook = async (book: BookData) => {
  try {
    await db.book.delete({
      where: { id: book.id },
    });
  } catch (err) {
    console.error(err);
  }
  redirect("/bookings");
};
