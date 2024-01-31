"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import classes from "./search-text-input.module.css";

interface Book {
  title: string;
  authors: string[];
  image: string;
}

interface SearchTextInputProps {
  type: "title" | "author";
}

export const SearchTextInput = ({ type }: SearchTextInputProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const { setValue, getValues } = useFormContext();

  const handleSearch = async () => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const { title, author } = getValues();
    console.log("title", title, "author", author);

    let queryUrl = "https://www.googleapis.com/books/v1/volumes?q=";

    if (author) {
      queryUrl += `inauthor:${author}+intitle:${searchInput}`;
    } else if (title) {
      queryUrl += `inauthor:${searchInput}+intitle:${title}`;
    } else {
      queryUrl += `in${type}:${searchInput}`;
    }

    queryUrl += "&printType=books&key=" + apiKey;

    const response = await fetch(queryUrl);
    const books = await response.json();

    if (response.ok) {
      const firstThreeBooks = (books.items || [])
        .slice(0, 3)
        .map((book: any) => ({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
        }));
      setSuggestions(firstThreeBooks);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchInput(newQuery);

    if (newQuery.length >= 3) {
      handleSearch();
    } else {
      setSuggestions([]);
    }
  };

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setSearchInput(target.value);
    setValue(type, target.value);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={`Enter book ${type}`}
        value={searchInput}
        onChange={handleInputChange}
        className={classes.input}
      />
      {suggestions && (
        <div className={classes.suggestionsWrapper}>
          {type === "title"
            ? suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={handleOnClick}
                  value={suggestion[type]}
                  type="button"
                >
                  {suggestion[type]}
                </button>
              ))
            : suggestions.map(
                (suggestion, index) =>
                  suggestion.authors && (
                    <div key={index}>
                      {suggestion.authors.map((author, index) => (
                        <button
                          key={index}
                          value={author}
                          onClick={handleOnClick}
                          type="button"
                        >
                          {author}
                        </button>
                      ))}
                    </div>
                  ),
              )}
        </div>
      )}
    </div>
  );
};
