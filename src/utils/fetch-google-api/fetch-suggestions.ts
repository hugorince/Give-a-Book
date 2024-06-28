type fetchSuggestionsProps = {
  title: string;
  author: string;
  newQuery: string;
  type: "author" | "title";
};

type GoogleApiBook = {
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
      thumbnail?: string;
    };
  };
};

const constructQueryUrl = ({
  title,
  author,
  newQuery,
  type,
}: fetchSuggestionsProps) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  let constructedUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  if (author) {
    constructedUrl += `inauthor:${author}+intitle:${newQuery}`;
  } else if (title) {
    constructedUrl += `inauthor:${newQuery}+intitle:${title}`;
  } else {
    constructedUrl += `in${type}:${newQuery}`;
  }
  return constructedUrl + "&printType=books&key=" + apiKey;
};

export const fetchSuggestions = async ({
  title,
  author,
  newQuery,
  type,
}: fetchSuggestionsProps) => {
  const queryUrl = constructQueryUrl({
    title,
    author,
    newQuery,
    type,
  });

  const response = await fetch(queryUrl);
  const books = await response.json();

  if (response.ok && books.items) {
    const allBooks = books.items.map((book: GoogleApiBook) => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail
        ? book.volumeInfo.imageLinks.thumbnail
        : "",
    }));

    return allBooks;
  } else {
    return [];
  }
};
