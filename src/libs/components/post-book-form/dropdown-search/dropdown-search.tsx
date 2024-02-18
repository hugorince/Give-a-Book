import {
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  useRef,
  useEffect,
  useCallback,
} from "react";
import type { SearchTextInputProps, Book } from "../search-text-input";
import classes from "./dropdown-search.module.css";

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

  const handleOutsideClick: EventListener = useCallback(
    (e: Event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setSuggestions(null);
      }
    },
    [setSuggestions],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  if (suggestions)
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
