"use server";

import { db } from "@/libs/database";
import { PostBookFormSchema } from "@/libs/types";
import { z } from "zod";

export const postBook = async (
  values: z.infer<typeof PostBookFormSchema>,
  userId: number,
) => {
  await db.book.create({
    data: {
      title: values.title,
      author: values.author,
      description: values.description,
      image: values.image,
      userId: userId as number,
    },
  });
};
