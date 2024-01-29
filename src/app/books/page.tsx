import * as z from "zod";
import { PostBookFormSchema } from "@/libs/types";

export const Books = async () => {
  const books = await fetch("http://localhost:3000/api/book")
    .then((res) => res.json())
    .then((data) => data.books as z.infer<typeof PostBookFormSchema>[]);

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
