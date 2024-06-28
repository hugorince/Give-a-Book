import {
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  useRef,
  useEffect,
} from "react";
import type { SearchTextInputProps, Book } from "../search-text-input";
import classes from "./dropdown-search.module.css";
import { useOutsideClick } from "@/utils";

interface DropdownSearchProps {
  type: SearchTextInputProps["type"];
  suggestions: Book[] | null;
  setSuggestions: Dispatch<SetStateAction<Book[] | null>>;
  handleOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const DropdownSearch = ({
  type,
  suggestions,
  setSuggestions,
  handleOnClick,
}: DropdownSearchProps) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const { outsideClick } = useOutsideClick({ refs: [wrapperRef] });

  useEffect(() => {
    if (outsideClick) setSuggestions(null);
  }, [outsideClick, setSuggestions]);

  if (!suggestions) return null;

  return (
    <ul className={classes.suggestionsWrapper} ref={wrapperRef}>
      {type === "title"
        ? suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                onClick={handleOnClick}
                value={suggestion[type]}
                type="button"
              >
                {suggestion[type]}
              </button>
            </li>
          ))
        : suggestions.map(
            (suggestion, index) =>
              suggestion.authors && (
                <li key={index}>
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
                </li>
              ),
          )}
    </ul>
  );
};
