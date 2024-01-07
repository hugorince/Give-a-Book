import { NextResponse } from "next/server";
import { db } from "@/libs/database";
import * as z from "zod";

const bookSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  userId: z.number(),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { title, description, author, userId } = bookSchema.parse(body);

    const newBook = await db.book.create({
      data: {
        title: title,
        description: description,
        author: author,
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        book: newBook,
        message: "book created successfully",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something wen wrong" },
      { status: 500 },
    );
  }
};
