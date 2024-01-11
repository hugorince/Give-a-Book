"use client";

import { useEffect, useState } from "react";

export const Books = () => {
  const [books, setBooks] = useState<any[]>([]);

  const getAllBooks = async () => {
    const response = await fetch("/api/book")
      .then((res) => res.json())
      .then((data) => setBooks(data.books))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <h1>All Books</h1>
      <div>
        {books && books.map((book) => <p key={book.id}>{book.title}</p>)}
      </div>
    </div>
  );
};

export default Books;
