import type { BookData } from "@/types";
import classes from "./dropdown-nav-searchbar.module.css";
import { Link } from "@/ui-kit";

interface DropdownNavSearchbarProps {
  books: BookData[] | null;
}

export const DropdownNavSearchbar = ({ books }: DropdownNavSearchbarProps) => {
  if (!books) return null;

  return (
    <ul className={classes.suggestionsWrapper}>
      {books.map((book, key) => (
        <Link variant="unstyled" key={key} href={`/book/${book.id}`}>
          {book.title}
        </Link>
      ))}
    </ul>
  );
};
