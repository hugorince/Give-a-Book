import { NextRequest, NextResponse } from "next/server";
import { db } from "@/libs/database";
import * as z from "zod";

const bookSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  userId: z.number(),
});

export const GET = async (req: NextRequest) => {
  try {
    // const searchParams = req.nextUrl.searchParams;
    // const id = searchParams.get("id");

    // if (id) {
    //   const book = await db.book.findUnique({
    //     where: {
    //       id: parseInt(id),
    //     },
    //   });

    //   return NextResponse.json(
    //     {
    //       book: book,
    //       message: "all books",
    //     },
    //     { status: 201 },
    //   );
    // }

    const books = await db.book.findMany();

    return NextResponse.json(
      {
        books: books,
        message: "all books",
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
