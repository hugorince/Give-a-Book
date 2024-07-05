"use client";

import { type ChangeEvent, useState, useEffect } from "react";
import type { BookData } from "@/types";
import classes from "./searchbar.module.css";
import { DropdownNavSearchbar } from "../dropdown-nav-searchbar";

interface SearchbarProps {
  books: BookData[];
}

export const Searchbar = ({ books }: SearchbarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<BookData[] | null>(null);

  useEffect(() => {
    if (inputValue.length >= 3) {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().startsWith(inputValue.toLowerCase()),
      );
      filtered.length > 0 && setFilteredBooks(filtered);
    } else {
      setFilteredBooks(null);
    }
  }, [inputValue, books]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={classes.searchbarContainer}>
      <input
        type="text"
        className={classes.searchbar}
        value={inputValue}
        onChange={handleChange}
      />
      <DropdownNavSearchbar books={filteredBooks} />
    </div>
  );
};
