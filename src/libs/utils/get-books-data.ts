import { db } from "@/libs/database";

export const getBooksData = async () => {
  const books = await db.book.findMany();

  return await Promise.all(
    books.map(async (book) => {
      const userName = await db.user.findUnique({
        where: { id: book.userId },
      });
      return {
        title: book.title,
        img: book.image,
        user: userName?.username,
      };
    }),
  );
};

export type BooksData = Awaited<ReturnType<typeof getBooksData>>[number];
