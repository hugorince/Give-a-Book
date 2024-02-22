"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fetchSuggestions } from "@/libs/utils";
import { InputText } from "@/libs/ui-components";
import { DropdownSearch } from "../dropdown-search";
import classes from "./search-text-input.module.css";

export interface Book {
  title: string;
  authors: string[];
  description: string;
  image: string;
}

export interface SearchTextInputProps {
  type: "title" | "author";
}

export const SearchTextInput = ({ type }: SearchTextInputProps) => {
  const { setValue, getValues, register } = useFormContext();
  const { title, author } = getValues();

  const [suggestions, setSuggestions] = useState<Book[] | null>(null);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    if (newQuery.length >= 3 || author || title) {
      const data = await fetchSuggestions({ title, author, newQuery, type });
      setSuggestions(data);
    } else {
      setSuggestions(null);
    }
  };

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setValue(type, target.value);

    if (type === "title" && suggestions) {
      const selectedSuggestion = suggestions.find(
        (suggestion) => suggestion.title === target.value,
      );
      if (selectedSuggestion) {
        setValue("author", selectedSuggestion.authors[0]);
        setValue("description", selectedSuggestion.description);
        setValue("image", selectedSuggestion.image);
      }
    }
    setSuggestions(null);
  };

  return (
    <div className={classes.inputDropdownWrapper}>
      <InputText
        type="text"
        label={type}
        placeholder={`Enter book ${type}`}
        {...register(type)}
        onChange={handleInputChange}
      />
      {suggestions && (
        <DropdownSearch
          type={type}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          handleOnClick={handleOnClick}
        />
      )}
    </div>
  );
};
