type fetchSuggestionsProps = {
  title: string;
  author: string;
  searchInput: string;
  type: "author" | "title";
};

export const fetchSuggestions = async ({
  title,
  author,
  searchInput,
  type,
}: fetchSuggestionsProps) => {
  const apiKey = process.env.GOOGLE_API_KEY;

  let queryUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  if (author) {
    queryUrl += `inauthor:${author}+intitle:${searchInput}`;
  } else if (title) {
    queryUrl += `inauthor:${searchInput}+intitle:${title}`;
  } else {
    queryUrl += `in${type}:${searchInput}`;
  }

  queryUrl += "&printType=books&key=" + apiKey;

  const response = await fetch(queryUrl);
  const books = await response.json();

  if (response.ok) {
    const firstThreeBooks = (books.items || [])
      .slice(0, 3)
      .map((book: any) => ({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
      }));
    return firstThreeBooks;
  } else {
    return [];
  }
};
