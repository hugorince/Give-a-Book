"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

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

  const handleSearch = () => {
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

    fetch(queryUrl)
      .then((response) => response.json())
      .then((data) => {
        const firstThreeBooks = (data.items || []).slice(0, 3).map((item) => ({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
        }));
        setSuggestions(firstThreeBooks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      />
      {suggestions && (
        <div>
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
