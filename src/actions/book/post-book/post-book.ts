"use server";

import { PostBookFormSchema } from "@/types";
import { z } from "zod";
import { db } from "@/db";

export const postBook = async (
  values: z.infer<typeof PostBookFormSchema>,
  userId: number,
) => {
  const exchange = values.exchangeGive === "exchange";

  await db.book.create({
    data: {
      title: values.title,
      author: values.author,
      description: values.description,
      image: values.image,
      userId: userId as number,
      exchange: exchange,
      give: !exchange,
    },
  });
};
