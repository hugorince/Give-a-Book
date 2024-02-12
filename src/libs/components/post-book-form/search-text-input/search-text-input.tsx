"use client";

import { type ChangeEvent, type MouseEvent, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { fetchSuggestions } from "@/libs/utils";
import classes from "./search-text-input.module.css";

interface Book {
  title: string;
  authors: string[];
  description: string;
  image: string;
}

interface SearchTextInputProps {
  type: "title" | "author";
}

export const SearchTextInput = ({ type }: SearchTextInputProps) => {
  const { setValue, getValues, register } = useFormContext();
  const { title, author } = getValues();

  const [suggestions, setSuggestions] = useState<Book[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    if (newQuery.length >= 3 || author || title) {
      const data = await fetchSuggestions({ title, author, newQuery, type });
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setValue(type, target.value);

    if (type === "title") {
      const selectedSuggestion = suggestions.find(
        (suggestion) => suggestion.title === target.value,
      );
      if (selectedSuggestion) {
        setValue("author", selectedSuggestion.authors[0]);
        setValue("description", selectedSuggestion.description);
        setValue("image", selectedSuggestion.image);
      }
    }
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={`Enter book ${type}`}
        {...register(type)}
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
