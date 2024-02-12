import { db } from "@/libs/database";

export const Books = async () => {
  const books = await db.book.findMany();

  const displayBooks = await Promise.all(
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

  return (
    <div>
      <h1>All Books</h1>
      <div>
        {displayBooks.map((book, index) => {
          return (
            <div key={index}>
              <p>{book.title}</p>
              <img src={book.img || ""} alt="" />
              <p>user : {book.user}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
