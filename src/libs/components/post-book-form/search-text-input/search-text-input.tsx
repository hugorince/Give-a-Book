"use client";

import { type ChangeEvent, type MouseEvent, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { fetchSuggestions } from "@/libs/utils";
import classes from "./search-text-input.module.css";
import { useQuery } from "@tanstack/react-query";

interface Book {
  title: string;
  authors: string[];
  image: string;
}

interface SearchTextInputProps {
  type: "title" | "author";
}

export const SearchTextInput = ({ type }: SearchTextInputProps) => {
  const { setValue, getValues } = useFormContext();
  const { title, author } = getValues();

  const [searchInput, setSearchInput] = useState(
    author && type === "author" ? author : "",
  );
  const [suggestions, setSuggestions] = useState<Book[]>([]);

  const { data } = useQuery({
    queryKey: ["suggestions", title, author, searchInput, type],
    queryFn: () => fetchSuggestions({ title, author, searchInput, type }),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchInput(newQuery);

    if (newQuery.length >= 3 || author || title) {
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setSearchInput(target.value);
    setValue(type, target.value);

    if (type === "title") {
      const selectedSuggestion = suggestions.find(
        (suggestion) => suggestion.title === target.value,
      );
      if (selectedSuggestion) {
        setValue("author", selectedSuggestion.authors[0]);
      }
    }
    setSuggestions([]);
  };

  useEffect(() => {
    console.log(author);
    if (type === "author" && author) {
      console.log("if entered");
      setSearchInput(author);
    }
  }, [author, type]);

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
