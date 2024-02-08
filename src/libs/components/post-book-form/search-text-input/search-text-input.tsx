"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fetchSuggestions } from "@/libs/utils";
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
  const { title, author } = getValues();

  const handleSearch = async () => {
    const suggestions: Book[] = await fetchSuggestions({
      title,
      author,
      searchInput,
      type,
    });
    setSuggestions(suggestions);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchInput(newQuery);

    if (newQuery.length >= 3 || author) {
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
                  onBlur={() => setSuggestions([])}
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
