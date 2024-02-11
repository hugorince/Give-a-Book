type fetchSuggestionsProps = {
  title: string;
  author: string;
  searchInput: string;
  type: "author" | "title";
};

const constructQueryUrl = ({
  title,
  author,
  searchInput,
  type,
}: fetchSuggestionsProps) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  let constructedUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  if (author) {
    constructedUrl += `inauthor:${author}+intitle:${searchInput}`;
  } else if (title) {
    constructedUrl += `inauthor:${searchInput}+intitle:${title}`;
  } else {
    constructedUrl += `in${type}:${searchInput}`;
  }
  return constructedUrl + "&printType=books&key=" + apiKey;
};

export const fetchSuggestions = async ({
  title,
  author,
  searchInput,
  type,
}: fetchSuggestionsProps) => {
  const queryUrl = constructQueryUrl({
    title,
    author,
    searchInput,
    type,
  });

  const response = await fetch(queryUrl);
  const books = await response.json();

  if (response.ok) {
    console.log(books.items);
    const firstThreeBooks = books.items.slice(0, 3).map((book: any) => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
    }));
    return firstThreeBooks;
  } else {
    return [];
  }
};
