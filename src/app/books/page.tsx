import { db } from "@/libs/database";

export const Books = async () => {
  const books = await db.book.findMany();

  return (
    <div>
      <h1>All Books</h1>
      <div>
        {books.map((book, index) => (
          <p key={index}>{book.title}</p>
        ))}
      </div>
    </div>
  );
};

export default Books;
